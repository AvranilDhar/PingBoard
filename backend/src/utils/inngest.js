import { Inngest } from "inngest";
import { connectDB } from "../db/db.js";
import { User } from "../models/user.model.js";


export const inngest = new Inngest({ id: "my-app" });

// Your new function:
const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);


const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },
    async ({ event }) => {
      await connectDB();

      const { id , first_name, last_name, email_addresses, image_url } = event.data ;

      const newUser = {
        clerkId : id,
        email : email_addresses[0]?.email_address,
        name : `${ first_name || ""} ${ last_name || ""}`,
        image : image_url,
      }

      await User.create(newUser);
      
    },
  );

const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-db" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        await connectDB();
        const { id } = event.data;
        await User.deleteOne({clerkId : id});
    },
  );

// Add the function to the exported array:
export const functions = [
  helloWorld,
  syncUser,
  deleteUserFromDB,
];
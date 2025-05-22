import { MailtrapClient }  from "mailtrap";
import dotenv from "dotenv"
dotenv.config()


 export const mailtrapClient = new MailtrapClient({
endpoint: process.env.MAILTRAP_TOKEN , token:process.env.MAILTRAP_ENDPPOINT
});

 export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Ayush Pandey",
};

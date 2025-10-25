import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";
// If using Twilio for SMS:
// import twilio from "twilio";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✉️ Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "2023mcb1290@iitrpr.ac.in",
    pass: "also ardb vrko dxjv", // Use an App Password, not your real one
  },
});

app.post("/sendNotification", async (req, res) => {
  const { message, email, phone } = req.body;

  try {
    // Send email
    await transporter.sendMail({
      from: '"Reminder App" <your-email@gmail.com>',
      to: email,
      subject: "Your Reminder Alert!",
      text: message,
    });

    // Optional: Send SMS via Twilio
    /*
    const client = twilio("TWILIO_SID", "TWILIO_AUTH_TOKEN");
    await client.messages.create({
      body: message,
      from: "+1234567890", // Your Twilio number
      to: phone,
    });
    */

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

app.listen(5000, () => console.log("✅ Notification server running on port 5000"));

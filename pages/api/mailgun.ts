// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const mailgun = require("mailgun-js");
  const DOMAIN = "mail.febrilian.com";
  const { verificationCode, emailAddress } = req.body;
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: DOMAIN,
  });

  const data = {
    from: "Pemira IKM FKUI 2020 <noreply@onedatamakara.com>",
    to: `${emailAddress}`,
    subject: "Your Verification Code",
    text: `Your verification code for Pemira 2020 is: ${verificationCode}`,
  };
  mg.messages().send(data, function (error: any, body: any) {
    console.log(body);
    res.json(body);
  });
};

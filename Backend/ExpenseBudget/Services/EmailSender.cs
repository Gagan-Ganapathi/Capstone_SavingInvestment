﻿using SendGrid.Helpers.Mail;
using SendGrid;

namespace ExpenseBudget.Services
{
    public class EmailSender
    {
        public async Task SendEmail( string subject,string toEmail, string username,string message)
        {
            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("gagan.g196016@gmail.com", "Personal Finance Tracker");
         
            var to = new EmailAddress(toEmail , username);
            var plainTextContent = message;
            var htmlContent = "";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}

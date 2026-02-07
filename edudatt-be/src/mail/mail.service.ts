import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';
import Handlebars from 'handlebars';
import { debug } from 'console';

@Injectable()
export class MailService {

    private transporter;
    constructor() {

        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

    }

    async sendMail(to: string, subject: string, html: string) {

        try {

            await this.transporter.sendMail({
                from: process.env.SMTP_FROM,
                to,
                subject,
                html
            });
            console.log("Mail sent successfully");
        } catch (e) {
            console.error("Error in sending mail", e);
        }


    }


    async renderTemplate(htmlFile, data) {

        try {

            const fullPath = join(process.cwd(), 'templates', htmlFile);

            const template = readFileSync(fullPath, 'utf8');

            const rawTemplate = Handlebars.compile(template);

            return rawTemplate(data);

        } catch (e) {
            console.error('Error in rendering template', e);
        }

    }

}

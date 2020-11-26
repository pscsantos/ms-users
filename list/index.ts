import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getRepository } from "typeorm";
import { connection } from '../common/connection';
import { User } from "../entities/User";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    try {
        await connection();
        const userRepository = getRepository(User);       
        const users = await userRepository.find();

        context.res = {
            status: 200,
            body: users,
        };

    } catch (error) {
        context.res = {
            status: 500,
            body: { message: error.message}
        };
    }

};

export default httpTrigger;
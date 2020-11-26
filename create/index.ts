import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getRepository } from "typeorm";
import { connection } from '../common/connection';
import { User } from "../entities/User";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    try {
        await connection();

        const userRepository = getRepository(User);
        
        const userBody = userRepository.create(req.body);

        const user = await userRepository.save(userBody)

        context.res = {
            status: 201,
            body: user
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }   
};

export default httpTrigger;
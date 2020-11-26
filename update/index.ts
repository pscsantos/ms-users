import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getRepository } from "typeorm";
import { connection } from '../common/connection';
import { User } from "../entities/User";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        await connection();

        const { id } = req.params;

        const data = req.body;

        const userRepository = getRepository(User);
        
        const user = await userRepository.findOne(id);

        userRepository.merge(user, data);

        const userUpdate = await userRepository.save(user);

        context.res = {
            status: 200,
            body: userUpdate
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }   
};

export default httpTrigger;
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getRepository } from "typeorm";
import { connection } from '../common/connection';
import { User } from "../entities/User";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    
    try {
        await connection();

        const { email,cpf } = req.body; 

        const userRepository = getRepository(User);

        const existEmail = await userRepository.findOne({
            where: {
                email
            }
        });

        const existCpf = await userRepository.findOne({
            where: {
                cpf
            }
        });

        if( typeof existEmail !== 'undefined' || typeof existCpf !== 'undefined') {
            context.res = {
                status: 400,
                body: {
                    message: 'User already exists with this email or cpf' 
                }
            };
            context.done();
        }else {
            const userBody = userRepository.create(req.body);
            const user = await userRepository.save(userBody)
            context.res = {
                status: 201,
                body: user
            };
            context.done();
        }
        
        
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
        context.done();
    }   
};

export default httpTrigger;
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { StudentService } from "src/student/student.service";

@Injectable()
export class StudentGuard implements CanActivate{

    constructor(
        private readonly studentService: StudentService
    ){}


    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        
        const studentId = request.headers['student'];

        if(!studentId){
            throw new UnauthorizedException('Student not found');
        }

        const student = await this.studentService.getStudentById(studentId, request.user);
        
        request.student = student;

        return true;
        
    }

}

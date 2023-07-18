import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.enum";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]
    transform(value: any) {
        value = value.toUpperCase();
        if (! this.isStatusValid(value)) {
            throw new BadRequestException(`"${value} is an invalid status"`);
        }else{
            return value;
        }
    }

    private isStatusValid(staus:any){
        const idx = this.allowedStatus.indexOf(staus);
        return idx -1

    }

    
}
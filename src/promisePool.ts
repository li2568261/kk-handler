import { checkType } from "./utils";

export const createPromisePool = (limit:number)=>{
    let penddingCount = 0;
    const waitingQueue = [];

    const checkTypeAndComplateOpreate = async (fuc: any)=>{
        try {
            penddingCount++
            if(checkType(fuc, 'Function'))await (fuc as Function)();
        } catch(e){
            console.log(e);
        }
        if(waitingQueue.length){
            checkTypeAndComplateOpreate(waitingQueue.shift())
        } else {
            penddingCount--;
        };

    }

    const promisePool = (fun: any)=>{
        if(penddingCount < limit){
            checkTypeAndComplateOpreate(fun);
        }else {
            waitingQueue.push(fun);
        }
    }

    return promisePool;
}

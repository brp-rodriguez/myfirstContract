const TasksContract = artifacts.require("TasksContract") // Cargo mi contrato

contract("TasksContract", ()=>{
    // Creo mi objeto antes de todo 
    // El tasksContract es visible ya que le puse "this"
     before(async() => {
         this.tasksContract =  await TasksContract.deployed();
     })

     // Primer caso de test 
     it('migrate deployed successfully', async()=>{
         const address = this.tasksContract.address 
         assert.notEqual(address,null);
         assert.notEqual(address,undefined);
         assert.notEqual(address,0x0);
         assert.notEqual(address,"");
         
     })
     
     it('get Tasks List', async()=>{
         const tasksCounter =await this.tasksContract.taskCounter()
         const task = await this.tasksContract.tasks(tasksCounter-1)         
         assert.equal(task.id.toNumber(),tasksCounter -1)
         assert.equal(task.title,"Primera Tarea")
         assert.equal(task.description,"Algo para hacer")
         assert.equal(task.done,false)
         assert.equal(tasksCounter,1)
     })

     it("task created successfully", async()=>{
        
        const result = await this.tasksContract.createTask("Some Task","Some Do")
        const taskEvent_extracted = result.logs[0].args;
        const tasksCounter =await this.tasksContract.taskCounter()

        assert.equal(tasksCounter,2);
        assert.equal(taskEvent_extracted.id.toNumber(),2);
        assert.equal(taskEvent_extracted.title,"Some Task");
        assert.equal(taskEvent_extracted.description,"Some Do");
        assert.equal(taskEvent_extracted.done,false);
     })
})
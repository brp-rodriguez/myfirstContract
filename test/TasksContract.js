const TasksContract = artifacts.require("TasksContract") // Cargo mi contrato

contract("TasksContract", ()=>{
    // Creo mi objeto antes de todo 
    // El tasksContract es visible ya que le puse "this"
     before(async() => {
         this.tasksContract =  await TasksContract.deployed();
     })

     it('migrate deployed successfully', async()=>{
         const address = this.tasksContract.address 

         assert.notEqual(address,null);
         assert.notEqual(address,undefined);
         assert.notEqual(address,0x0);
         assert.notEqual(address,"");

     })
     

})
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.6;

    contract TasksContract {  // Tares en Contrato
        uint public taskCounter = 0 ;
        
        constructor(){
            createTask("Primera Tarea","Algo para hacer");
        }
        // Permite registrar la tarea en el log
        event TaskCreated(            
            uint id,
            string tittle,
            string description,
            bool done,
            uint createdAt
        );

        // Creación de Tipo de dato                    
        struct Task{
            uint256 id;
            string tittle;
            string description;
            bool done;
            uint256 createdAt;
        } 
        event TaskToggleDone(uint id, bool done);

        // Declaracción de funcion (Tipp de Datos) 
        // ... Al final  se ecribe el tipo de datos y tarea
        mapping (uint256 => Task) public tasks;
        // A los Task se puede acceder de 1 en 1 --> se vera en truffle console

        // Esto solo se guarda en memoria y se añade "memoery"
        function createTask(string memory _tittle, string  memory _description) public {
            tasks[taskCounter]= Task(taskCounter, _tittle, _description, false, block.timestamp);
            taskCounter++;
            emit TaskCreated(taskCounter, _tittle, _description, false, block.timestamp);
        }

        function toggleDone(uint _id ) public {
            // codigo del autor 
            Task memory _task =tasks[_id];
            _task.done = !_task.done ;   
            tasks[_id] = _task;
            //tasks[_id].done = !tasks[_id].done // .... creo 
            emit TaskToggleDone(_id,_task.done);
        }

    }



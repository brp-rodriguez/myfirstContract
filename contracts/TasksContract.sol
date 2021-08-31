// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract {  // Tares en Contrato
    uint public taskCounter = 0 ;
    // Creación de Tipo de dato    
    struct Task{
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt;
    }
    // Declaracción de funcion (Tipp de Datos) 
    // ... Al final  se ecribe el tipo de datos y tarea
    mapping (uint256 => Task) public tasks;
    // A los Task se puede acceder de 1 en 1 --> se vera en truffle console

    // Esto solo se guarda en memoria y se añade "memoery"
    function createTask(string memory _title, string  memory _description) public {
        tasks[taskCounter]= Task(1, _title, _description, false, block.timestamp);
        taskCounter++;
    }

    // function toggleDone(){}

}



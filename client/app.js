App = {
    contracts:{},
    init: async ()=>{
        console.log("Loaded");
        await App.loadEthereum();
        await App.loadContracts();
        await App.loadAccount();
        await App.renderTask();
        App.render();
    },
    loadEthereum: async ()=>{
        /*Aplicaiones para cargar tus monederos ethereum o web3*/
        if(window.ethereum){         
            App.web3Provider = window.ethereum
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        }else if(window.web3){ 
            web3  = new Web3(window.web3.currentProvider)
        }else{
            console.log( 'No hay Ethereum Navegador Instalado. Intenta instalando MetaMask')
        }
    },

    loadAccount: async ()=>{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });        
        App.account = accounts[0];
    },
    loadContracts: async ()=>{
        const res = await fetch("TasksContract.json");
        const tasksContractJson = await res.json();
        // console.log(tasksContractJson);
        
        App.contracts.tasksContract=TruffleContract(tasksContractJson)

        App.contracts.tasksContract.setProvider(App.web3Provider)

        App.tasksContract = await App.contracts.tasksContract.deployed()        

    }, 
    render:()=>{
        document.getElementById('account').innerText = App.account;
    },

    

    renderTask: async()=>{
        const taskCounter = await App.tasksContract.taskCounter();
        const taskCounterNumber = taskCounter.toNumber();
        console.log(taskCounterNumber); 

        let html = '';

        for (let i = 0; i < taskCounterNumber; i++) {
            const task = await App.tasksContract.tasks(i);
            console.log(task);
            const taskId = task[0];
            const taskTitle = task[1];
            const taskDescription = task[2];
            const taskDone = task[3];
            const taskCreated = task[4];
            console.log(taskDone);
            let taskElement = `
                <div class="card bg-dark rounded-0 mb-2">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span>${taskTitle}</span>                        
                        
                        <div class="form-check form-switch">
                            <input class="form-check-input" data-id="${taskId}" type="checkbox" ${taskDone && "checked" }
                                onchange="App.toggleDone(this)"
                            />
                        </div>
                    </div>
                    <div class="card-body">
                        <span>${taskDescription}</span>                        
                        <p class="text-muted"> Task was created ${new Date(taskCreated * 1000).toLocaleString() }</p>
                    </div>
                </div>
            `
            html +=taskElement;                            
        }

        document.querySelector("#taskList").innerHTML  = html; 

    },
    createTask: async(title, description)=>{
        const result = await App.tasksContract.createTask(title,description,{
            from: App.account
        })
        console.log(result.logs[0].args)
    },

    toggleDone: async (element)=>{
        const taskId = element.dataset.id;
        console.log(element.dataset.id);
        
        await App.tasksContract.toggleDone(taskId, {
            from: App.account
        });

        window.location.reload();
    }
}


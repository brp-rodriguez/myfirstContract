App = {
 contracts:{},
 init: ()=>{
    console.log("Loaded")
    App.loadEthereum()
    App.loadContracts()
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

    loadContracts: async ()=>{
        const res = await fetch("TasksContract.json")                                 
        const tasksContractJson = await res.json()
        // console.log(tasksContractJson)
        
        App.contracts.tasksContract = TruffleContract(tasksContractJson)

        App.contracts.tasksContract.setProvider(App.web3Provider)

        App.tasksContract = await App.contracts.tasksContract.deployed()

    }
}
App.init()

var app = angular.module('AppTabla',[])

app.controller('ctrlTabla', function($scope,$http,$sce,$log){

    $scope.mostrarTabla = false;
    $scope.mostrarInformacionPersonalizada = false;


    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    var header_config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    };

            
    $scope.llamarDatos = function(){
        //SOLICITUD DE DATOS
        $http({
            method : 'GET',
            url : $scope.trustSrc('http://localhost:8080/bancos/listar'),header_config})
        
        .then(function(response){  
                console.log(response);
                $scope.bancos = response.data;
                $scope.generarTabla();
                                    
            }),function(error){
                console.log(error)
            };
    }

    $scope.traerBanco = function(){
      
        //SOLICITUD DE DATOS
        $http({
            method : 'PUT',
            url : $scope.trustSrc('http://localhost:8080/bancos/banco'),
            data : JSON.stringify({idNombre : $scope.nombre}),
            config : header_config
        })
        
        .then(function(response){  
            console.log(response); 
          
                //CREAR METODO QUE ME ARME UN DIALOGO, ESPECIFICANDO EL MONTO DEL CREDITO, LAS CUOTAS Y EL INTERES MENSUAL, OBTENIDO DE ESTA FUNCION.
            
            $scope.nombreBanco = response.data.idNombre;
            $scope.tasaInteres = response.data.tasaInteresMensual;
            $scope.gastosAsociados = response.data.gastosAsociados;
            var tasaInteres = response.data.tasaInteresMensual;
            var gastosAsociados = response.data.gastosAsociados;
            var NumCuotas = $scope.numeroCuotas;

            var ti = tasaInteres/100;
            var primero = Math.pow(1+ti,$scope.numeroCuotas)*ti;
            var segundo = Math.pow(1+ti,$scope.numeroCuotas)-1;  

            //MONTO BRUTO CREDITO
            $scope.montoBrutoCredito = $scope.gastosAsociados + parseInt($scope.montoSolicitado);
            console.log($scope.montoBrutoCredito);
            //CUOTA MENSUAL
            $scope.cuotaMensual = parseInt($scope.montoSolicitado * (primero/segundo));

            //COSTO TOTAL
            $scope.costoTotal = parseInt(($scope.cuotaMensual * $scope.numeroCuotas) + response.data.gastosAsociados);
            
            //TOTAL INTERESES
            $scope.totalIntereses = parseInt($scope.costoTotal - $scope.montoBrutoCredito);
                                    
            $scope.mostrarInformacionPersonalizada = true;
            }),function(error){
                console.log(error)
            };
    }


    $scope.generarTabla = function(){
       $scope.mostrarTabla = true;
        for( var i in $scope.bancos  ){

            var tasaInteres = $scope.bancos[i].tasaInteresMensual; 
            var gastosAsociados = $scope.bancos[i].gastosAsociados;

            var NumCuotas = $scope.numeroCuotas;
            //MONTO BRUTO CREDITO
            $scope.bancos[i].montoBrutoCredito = (gastosAsociados + parseInt($scope.montoSolicitado));
             //FORMULA PARA GENERAR CUOTAS MENSUALES, COSTO TOTAL Y TOTAL DE INTERESES
            var ti = tasaInteres/100;

            var primero = Math.pow(1+ti,$scope.numeroCuotas)*ti;

            var segundo = Math.pow(1+ti,$scope.numeroCuotas)-1;   

            //CUOTA MENSUAL
            //La formula devuelve el valor de cada cuota
            $scope.bancos[i].cuota = parseInt($scope.montoSolicitado * (primero/segundo));     

            //COSTO TOTAL
            $scope.bancos[i].costoTotal = parseInt(($scope.bancos[i].cuota * NumCuotas) + $scope.bancos[i].gastosAsociados);
            //TOTAL DE INTERESES    
            $scope.bancos[i].totalIntereses = parseInt($scope.bancos[i].costoTotal - $scope.bancos[i].montoBrutoCredito);
            
            $scope.numeroCuotas1 = $scope.numeroCuotas;
            $scope.montoSolicitado1 = $scope.montoSolicitado;
        
            console.log($scope.numeroCuotas);
            console.log(ti + "Tasa Interes");
            console.log(primero + "Primero");
            console.log(segundo+ "Segundo");
            console.log($scope.bancos[i].tasaInteresMensual+" Tasa interes mensual");
            console.log($scope.numeroCuotas+ " Numero de cuotas");
            
        }
    }
       
    $scope.ngMostrarOcultar1 = true;
    $scope.ngMostrarOcultar = false;
    $scope.ngMostrarOcultarFun = function(ver){
        if(ver){
            $scope.ngMostrarOcultar = false;
            $scope.ngMostrarOcultar1 = true;
        }else{
            $scope.ngMostrarOcultar = true;
            $scope.ngMostrarOcultar1 = false;
        }
    }

});
        


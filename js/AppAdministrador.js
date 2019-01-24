var app = angular.module('AppAdministrador', [])

app.controller('ctrlAdministrador',function($scope,$http,$sce,$timeout){

    $scope.mostrarMensaje = false;
    $scope.mostrarMensaje1 = false;
    $scope.mostrarMensaje2 = false;
    $scope.mensaje = "";
    $scope.mensaje2= "";
    $scope.mensaje3= "";

    $scope.ngMostrarOcultarEje = false;
    $scope.ngMostrarOcultarFunEje = function(ver){
        if(ver){
            $scope.ngMostrarOcultarEje = false;
        }else{
            $scope.ngMostrarOcultarEje = true;
            $scope.ngMostrarOcultarBanc = false;
            $scope.ngMostrarOcultarUsu = false;
        }
    }

    $scope.ngMostrarOcultarUsu = false;
    $scope.ngMostrarOcultarFunUsu = function(ver){
        if(ver){
            $scope.ngMostrarOcultarUsu = false;
        }else{
            $scope.ngMostrarOcultarUsu = true;
            $scope.ngMostrarOcultarEje = false;
            $scope.ngMostrarOcultarBanc = false;
        }
    }

    $scope.ngMostrarOcultarBanc = false;
    $scope.ngMostrarOcultarFunBanc = function(ver){
        if(ver){
            $scope.ngMostrarOcultarBanc = false;
        }else{
            $scope.ngMostrarOcultarBanc = true;
            $scope.ngMostrarOcultarEje = false;
            $scope.ngMostrarOcultarUsu = false;
        }
    }
  

    $scope.trustSrc = function(src){
        return $sce.trustAsResourceUrl(src);
    }

    var header_config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    };

    $scope.crearUsuario = function(){

    var form_data = ({
        rut : $scope.rutUs,
        password : $scope.passwordUs,
        nombre : $scope.nombreUs,
        apellido : $scope.apellidoUs,
        correo : $scope.correoUs
    });

    $http({
        method : 'POST',
        url : $scope.trustSrc("http://localhost:8080/usuarios/registrar"),
        data : JSON.stringify(form_data),
        config : header_config  
    }).then(
        function(response){
            console.log(response);
            if(response.data){
                $scope.mensaje = "Usuario registrado exitosamente";
                $scope.mostrarMensaje = true;
            }
        },function(error){

        });
    }

    $scope.crearUsuarioEjecutivo = function(){

        var form_data = ({
            rut : $scope.rut,
            password : $scope.password,
            nombre : $scope.nombre,
            apellido : $scope.apellido,
            correo : $scope.correo
        });

        $http({
            method : 'PUT',
            url : $scope.trustSrc("http://localhost:8080/usuarios/registrarEjecutivo"),
            data : JSON.stringify(form_data),
            config : header_config  
        }).then(
            function(response){
                console.log(response);
                if(response.data){
                    $scope.mensaje1 = "Ejecutivo registrado exitosamente";
                    $scope.mostrarMensaje1 = true;
                }
            },function(error){

            });
        }

        $scope.actualizarDatos = function(){

            var form_data = ({
                idNombre : $scope.idNombre,
                cae : $scope.cae,
                tasaInteresMensual : $scope.tasaInteresMensual,
                gastosAsociados : $scope.gastosAsociados
            });
    
            //METODO PUT PARA ACTUALIZAR CAE, TASA INTERES Y GASTOS ASOCIADOS SEGUN UN ID
            $http({
                method : 'PUT',
                url : $scope.trustSrc("http://localhost:8080/bancos/setear"),
                data : JSON.stringify(form_data),
                config : header_config  
            }).then(
                function(response){
                    console.log(response);
                    if(response.data){
                        $scope.mensaje2 = "Datos actualizados correctamente";
                        $scope.mostrarMensaje2 = true;
                        console.log($scope.cae);
                        console.log($scope.gastosAsociados);
                        console.log($scope.tasaInteresMensual)
                        console.log($scope.idNombre);
                        
                    }
                    
    
                },function(error){
                    console.log(error);
    
                });
            }
    
});
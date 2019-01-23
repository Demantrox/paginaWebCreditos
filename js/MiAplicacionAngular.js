
var app = angular.module('AppLogin', [])

app.controller('ctrlLogin',function($scope,$http,$sce){


    
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    $scope.rut = "";
    $scope.password ="";
    $scope.mostrarError = false;
    $scope.mostrarLogin = true;
    $scope.mensaje = "";
    $scope.nombreUsuario ="";
    


     
    var header_config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
   
        $scope.login = function(){
            if($scope.rut=="" || $scope.password==""){
                $scope.mensaje = "Ingrese datos";
                $scope.mostrarError = true;
                return;

            }else{

            var form_data = ({
                rut: $scope.rut,
                password : $scope.password
            });

            $http({
                method : 'POST',
                url : $scope.trustSrc("http://localhost:8080/usuarios/login"),
                data : JSON.stringify(form_data),
                config : header_config
            }).then(function(response){              
                console.log(response.data); 

                 if(response.data){
                     //ALMACENAR INFO EN STORAGE
                    var username = response.data.nombre;
                    var rol = response.data.rol;
                    window.localStorage.setItem("usuario",username);
                    window.localStorage.setItem("rol",rol.idRol);
                     //SI ES USUARIO NORMAL LO REDIRIGE A LA TABLA PARA SIMULAR
                     if(rol.idRol == 3){
                        window.location.href='paginaTabla.html'
                        console.log(response);
                        console.log(localStorage.getItem("usuario"));
                        console.log(localStorage.getItem("rol"));
                        //SI ES USUARIO EJECUTIVO LO REDIRIGE A SU PAG
                     }else if(rol.idRol == 2){    
                        window.location.href='inicioSesion.html'    
                        console.log(response);
                        console.log(localStorage.getItem("usuario"));
                        console.log(localStorage.getItem("rol"));
                    
                        //SI ES ADMINISTRADOR LO ENVIA A SU PAG
                     }else if(rol.idRol == 1){
                        window.location.href='menuAdministrador.html'
                        console.log(response);
                        console.log(localStorage.getItem("usuario"));
                        console.log(localStorage.getItem("rol"));
                     }
                     
                 }else{
                     $scope.mostrarError = true;
                     $scope.mensaje = "Usuario y/o contraseña incorrectos."
                 }
                
   
                },function(error){
                    console.log(error);
                });
               
            }};  
});


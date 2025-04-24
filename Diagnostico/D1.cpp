/*Un sistema de venta de productos de limpieza al por mayor le ofrece a sus clientes minoristas una
aplicación de consola para poder gestionar sus pedidos a la casa central. Los clientes se identifican con
un usuario y contraseña. El programa al iniciarse, pide estas credenciales de acceso, las corrobora y en
caso de ser correctas mostrará un mensaje de bienvenida “¡Bienvenido/a nombre-de-usuario!” Caso
contrario, mostrará un mensaje de error “Usuario y/o contraseña incorrecta”. Al tercer intento incorrecto de
acceso, el usuario deberá ser bloqueado y el mensaje deberá ser “Usuario bloqueado. Contacte al
administrador”.*/

#include <iostream>
#include <string>
using namespace std;

struct Cliente {
    string usuario;
    string contraseña;
};

int main() {
    Cliente personas[] = {
        {"valeria", "1234"},
        {"juniors", "1144"},
        {"jonatan", "2323"},
        {"luci", "1122"}
    };

    string usuarioIngresado;
    string contraseñaIngresada;
    int intentos = 0;
    bool accesoConcedido = false;

    while (intentos < 3) {
        cout << "Usuario: ";
        cin >> usuarioIngresado;
        cout << "Contrasenia: ";
        cin >> contraseñaIngresada;

        
        for (const Cliente& cliente : personas) {
            if (usuarioIngresado == cliente.usuario && contraseñaIngresada == cliente.contraseña) {
                cout << "Bienvenido " << usuarioIngresado << endl;
                accesoConcedido = true;
                break;
            }
        }

        if (accesoConcedido) {
            break; 
        } else {
            intentos++;
            if (intentos < 3) {
                cout << "Usuario y/o contrasenia incorrecta." << endl;
            } else {
                cout << "Usuario bloqueado. Contacte al administrador." << endl;
            }
        }
    }

    return 0;
}
    
    
   
   







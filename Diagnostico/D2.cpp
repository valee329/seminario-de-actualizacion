/*2. En el sistema del punto 1, una vez que el usuario ingresa satisfactoriamente (si sus credenciales de
acceso son válidas) es recibido con un mensaje de bienvenida. Extienda el programa de modo tal que
además del mensaje, pueda acceder a un menú de acciones etiquetado: ( 1. Cambiar contraseña. X. Salir
). En la acción 1. el usuario podrá cambiar su contraseña efectivamente y con la acción 2, salir de esa
sección y regresar al inicio del sistema en donde se preguntan por las credenciales.*/

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



while(true){
    string usuarioIngresado;
    string contraseñaIngresada;
    int intentos = 0;
    bool encontrado = false;
    Cliente* clienteActual = nullptr;

    
    while (intentos < 3 && !encontrado) {
        cout << "\tINICIAR SESION" << endl;
        cout << "Usuario: ";
        cin >> usuarioIngresado;
        cout << "Contrasenia: ";
        cin >> contraseñaIngresada;

        for (Cliente& cliente : personas) {
            if (usuarioIngresado == cliente.usuario && contraseñaIngresada == cliente.contraseña) {
                cout << "Bienvenido " << usuarioIngresado << endl;
                encontrado = true;
                clienteActual = &cliente;
                break;
            }
        }

        if (!encontrado) {
            intentos++;
            if (intentos < 3) {
                cout << "Usuario y/o contrasenia incorrecta." << endl;
            } else {
                cout << "Usuario bloqueado. Contacte al administrador." << endl;
                return 0;
            }
        }
    }

    
    while (encontrado) {
        int opcion = 0;
        cout << "\nMENU" << endl;
        cout << "1. Cambiar contrasenia" << endl;
        cout << "2. Salir" << endl;
        cout << "Elija una opcion: ";
        cin >> opcion;

        if (opcion == 1) {
            string nuevaContraseña;
            cout << "\tCambio de contrasenia" << endl;
            cout << "Ingrese la nueva contrasenia: ";
            cin >> nuevaContraseña;
            clienteActual->contraseña = nuevaContraseña;
            cout << "Contrasenia cambiada con exito" << endl;
        } 
        else if (opcion == 2) {
            cout << "Sesion finalizada" << endl;
            encontrado = false;
            clienteActual = nullptr;
        } 
        else {
            cout << "Opcion incorrecta" << endl;
        }
    }
}



return 0;
}









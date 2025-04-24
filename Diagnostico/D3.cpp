/*3. Modifique el sistema del punto 2, de modo tal que la contraseña satisfaga 
los requisitos de seguridad descritos a continuación: Entre 8 y 16 caracteres 
alfanuméricos, al menos una mayúscula y al menos 2 símbolos especiales.*/

#include <iostream>
#include <string>
#include <cctype>

using namespace std;

struct Cliente {
    string usuario;
    string contrasenia;
};


Cliente personas[] = {
    {"valeria", "12Valeria!!"},
    {"juniors", "1212121221"},
    {"jonatan", "2323232323"},
    {"luci", "112233445566"}
};


bool iniciarSesion(Cliente*& clienteActual) {
    string usuarioIngresado, contraseniaIngresada;
    int intentos = 0;

    while (intentos < 3) {
        cout << "\n----- INICIAR SESION -----" << endl;
        cout << "Usuario: ";
        cin >> usuarioIngresado;
        cout << "Contrasenia: ";
        cin >> contraseniaIngresada;

        for (Cliente& cliente : personas) {
            if (usuarioIngresado == cliente.usuario && contraseniaIngresada == cliente.contrasenia) {
                clienteActual = &cliente;
                cout << "Bienvenido " << cliente.usuario  << endl;
                return true;
            }
        }

        intentos++;
        cout << "Usuario y/o contrasenia incorrecta." << endl;
    }

    cout << "Usuario bloqueado. Contacte al administrador." << endl;
    return false;
}


bool validarContrasenia (const string& nuevaContrasenia){

    if (nuevaContrasenia.length() < 8 || nuevaContrasenia.length() > 16){
        return false;
    }

    bool contieneMayuscula = false;
    bool contieneSignos = false;
    bool contieneAlfabetico = false;
    bool contieneNumerico = false;
    for (char c : nuevaContrasenia) {
        if (isalpha(c)){
            contieneAlfabetico = true;
        }
        if(isdigit(c)){
            contieneNumerico = true;
        }
        if (isupper(c)){
            contieneMayuscula = true;
        }
        if (ispunct(c)){
            contieneSignos = true;
        }
    }

    if (!contieneAlfabetico){
        cout << "La contrasenia debe contener al menos una letra alfabetica." << endl;
        return false;
    }
    if (!contieneNumerico){
        cout << "La contrasenia debe contener al menos un digito numerico." << endl;
        return false;
    }
    if (!contieneMayuscula){
        cout << "La contrasenia debe contener al menos una letra en mayuscula." << endl;
        return false;
    }
    if (!contieneSignos){
        cout << "La contrasenia debe contener al menos dos simbolos especiales." << endl;
        return false;
    }

    return true;
}


bool cambiarContrasenia(string& contrasenia) {
    string nuevaContrasenia;
    cout << "\nLa nueva contrasenia debe tener:\n"
         << "- Entre 8 y 16 caracteres\n"
         << "- Al menos una letra\n"
         << "- Al menos un numero\n"
         << "- Al menos una mayuscula\n"
         << "- Al menos dos simbolo especiales\n" << endl;

    cout << "Ingrese la nueva contrasenia: ";
    cin >> nuevaContrasenia;

    if (validarContrasenia(nuevaContrasenia)) {
        contrasenia = nuevaContrasenia;
        cout << "Contrasenia cambiada con exito" << endl;
    } else {
        cout << "No se cambio la contrasenia. Intente nuevamente." << endl;
        cout << endl;
    }
}
    



void mostrarMenu(Cliente* clienteActual) {
    int opcion;
    do {
        cout << "\n----- MENU PRINCIPAL -----" << endl;
        cout << "1. Cambiar contrasenia" << endl;
        cout << "2. Salir" << endl;
        cout << "Seleccione una opcion: ";
        cin >> opcion;

        switch (opcion) {
            case 1:
                cambiarContrasenia(clienteActual->contrasenia);
                break;
            case 2:
                cout << "Sesion finalizada." << endl;
                cout << endl;
                break;
            default:
                cout << "Opcion no valida. Intente nuevamente." << endl;
        }
    } while (opcion != 2);
}


int main() {
    while (true) {
        Cliente* clienteActual = nullptr;

        
        if (!iniciarSesion(clienteActual)) {
            break;
        }

        
        mostrarMenu(clienteActual);
    }

    cout << "Programa finalizado." << endl;
    return 0;
}

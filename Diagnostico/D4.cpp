/*4. Modifique la solución para que al iniciarse el sistema, aparezca un menú 
con dos opciones numeradas: (1 = Iniciar sesión, 2 = Crear cuenta de usuario). 
En el primer caso, el ingreso de la acción 1 redirigirá a la consulta de las 
credenciales (usuario/contraseña) y en el caso 2, el sistema consultará por un 
nombre de usuario y contraseña siguiendo el criterio de fortaleza de contraseña
del punto 3 para crear una nueva cuenta. En todos los casos, al terminar la 
acción se redirige al menú principal nuevamente.*/


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
        cout << endl;

        for (Cliente& cliente : personas) {
            if (usuarioIngresado == cliente.usuario && contraseniaIngresada == cliente.contrasenia) {
                clienteActual = &cliente;
                cout << "Bienvenido/a " << cliente.usuario  << endl;
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


void cambiarContrasenia(string& contrasenia) {
    string nuevaContrasenia;
    cout << "\nLa nueva contrasenia debe tener:\n"
         << "- Entre 8 y 16 caracteres\n"
         << "- Al menos una letra\n"
         << "- Al menos un numero\n"
         << "- Al menos una mayuscula\n"
         << "- Al menos dos simbolo especiales\n" << endl;

    cout << "Ingrese la nueva contrasenia: ";
    cin >> nuevaContrasenia;
    cout << endl;

    if (validarContrasenia(nuevaContrasenia)) {
        contrasenia = nuevaContrasenia;
        cout << "La contrasenia es valida. Contrasenia cambiada con exito" << endl;
    } else {
        cout << "La contrasenia ingresada no es valida" << endl;
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

void crearUsuario (validarContrasenia){
    string nuevoUsuario, nuevaContrasenia;

    cout << "-----Crear Nuevo Usuario-----" << endl;
    cout << "Ingrese su nombre de usuario" << endl;
    cin >> nuevoUsuario;
    

}

void mostrarInicio(iniciarSesion, crearUsuario){

    int opcion;
    cout << "-----Inicio-----" << endl;
    cout << "1. Iniciar Sesion" << endl;
    cout << "2. Crear cuenta de usuario" << endl;
    cout << "Seleccione una opcion: " << endl;
    cin >> opcion;

    switch (opcion)
    {
    case 1:
        iniciarSesion();
        break;

    case 2:
        crearUsuario();
        break;
    
    default:
        cout << "Opcion incorrecta" << endl;
    }
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

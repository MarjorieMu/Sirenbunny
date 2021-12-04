const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos() {

    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();

    procesarCompraBtn.addEventListener('click', procesarCompra);
}

function procesarCompra(e) {
    e.preventDefault();

    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos',
            timer: 2000,
            showConfirmButton: false
        }).then(function() {
            window.location = "page1.html"
        })
    } else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            timer: 2000,
            showConfirmButton: false
        })

    } else {

        (function() {
            emailjs.init('user_feYpQOtfv0IDi8amo9fk9');
        })();

        var myform = $("form#procesar-pago");
        myform.submit(function(event) {
            event.preventDefault();
        })

        var service_id = "default_service";
        var template_id = "template_u1484yo";

        const cargandoGif = document.querySelector('#cargando');
        cargandoGif.style.display = 'block';

        const enviado = document.createElement('img');
        enviado.src = 'imagenes/mail.gif';
        enviado.style.display = 'block';
        enviado.width = '150';

        emailjs.sendForm(service_id, template_id, myform[0])
            .then(function() {
                cargandoGif.style.display = 'none';
                document.querySelector('#loaders').appendChild(enviado);

                setTimeout(() => {
                    enviado.remove();
                    compra.vaciarLocalStorage();
                    window.location = "page1.html";
                }, 1000);

            }, function(err) {
                alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
                myform.find("button").text("Send");
            });
        return false;
    };

}
var cont = 0;
$(document).ready(function() {
	// Inicialización Complementos de Materialize
	$('.carousel.carousel-slider').carousel({
		fullWidth: true,
		duration: '300'
	});
	$('.carousel.carousel-slider').click(function(event) {
		/* Act on the event */
		$(this).carousel('next');
	});
	$('.modal').modal();
	$('.collapsible').collapsible();
	$('ul.tabs').tabs();
	$('select').material_select();
	$('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 30 // Creates a dropdown of 15 years to control year
	});

	// Funciones propias
	$('.cantidad input').val('0');
	$('.precio input').val('0');
	$('.agregar_plato').click(function(event) {
		// Contador de clicks
		cont++;

		// Condicional para el cambio de tabs dependiendo de la cantidad de clicks
		if (cont==1) {
			$('ul.tabs').tabs('select_tab', 'formulario');
			$('#reservas').css('display', 'block');			
		}
		else if (cont>1) {
			$('ul.tabs').tabs('select_tab', 'pedido');
		}
		
		// Actualiza las columnas de Cantidad y Precio
		var plato = $(this).attr('id');
		var precio = parseInt($("#"+plato).attr('data-precio'));
		if ($("#"+plato+"_cantidad input").val() == 0 && $("#"+plato+"_precio input").val() == 0) {
			$("#"+plato+"_cantidad input").val(1);
			$("#"+plato+"_precio input").val(precio);			
		}else{
			var cantidad = parseInt($("#"+plato+"_cantidad input").val());
			cantidad += 1;
			$("#"+plato+"_cantidad input").val(cantidad);

			var precioP = precio*cantidad;
			$("#"+plato+"_precio input").val(precioP);
		}

		if (cont>1) {
			$('ul.tabs').tabs('select_tab', 'pedido');

			// Totaliza cuando se da click al boton agregar mas de uan vez
			var total = 0;
			$('#pedido table tr td.precio').each(function(){ 
				total += parseInt($(this).find('input').val()); 
			})
			var iva = (total*0.19);
			var precioF = 0;
			if ($('input:radio[name=propina]:checked').val()=="si") {
				var propina = (total*0.10);
				$('#propina_si_no').text('Sí');
				$('#propina_valor').text(propina);
			}else {
				var propina = 0;
				$('#propina_si_no').text('No');
				$('#propina_valor').text(propina);
			}
			precioF = total+iva+propina;
			$('#iva_valor').text(iva);
			$('#total').text("$ "+precioF);
		}	
	});

	// cambia de tab cuando se agrega los datos del comensal
	$('#addComensal').click(function(event) {
		// Agrega el Nombre del cliente a la facturas
		var nombre = $('.nombresComensal').val()+" "+$('.apellidosComensal').val();
		$('ul.tabs').tabs('select_tab', 'pedido');
		$('#cliente').text(nombre);

		// Totaliza el valor de la factura
		var total = 0;
		$('#pedido table tr td.precio').each(function(){ //filas con clase 'dato', especifica una clase, asi no tomas el nombre de las columnas
			total += parseInt($(this).find('input').val()); //numero de la celda 3
		})
		var iva = (total*0.19);
		var precioF = 0;
		if ($('input:radio[name=propina]:checked').val()=="si") {
			var propina = (total*0.10);
			$('#propina_si_no').text('Sí');
			$('#propina_valor').text(propina);
		}else {
			var propina = 0;
			$('#propina_si_no').text('No');
			$('#propina_valor').text(propina);
		}
		precioF = total+iva+propina;
		$('#iva_valor').text(iva);
		$('#total').text("$ "+precioF);
	});
});
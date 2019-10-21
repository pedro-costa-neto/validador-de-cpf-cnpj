function mascaraCpfCnpj(evento, campo){
	let valor = campo.value.replace(/\D/g,"");

	if( ( valor.length + 1 ) > 14){
		evento.returnValue = false;
	}
	
	if( valor.length > 11 ){
		valor = valor.replace(/^(\d{2})(\d)/,"$1.$2");
		valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
		valor = valor.replace(/\.(\d{3})(\d)/,".$1/$2");
		valor = valor.replace(/(\d{4})(\d)/,"$1-$2");
	}else{
		valor = valor.replace(/(\d{3})(\d)/,"$1.$2");
		valor = valor.replace(/(\d{3})(\d)/,"$1.$2");
		valor = valor.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
	}
	
	campo.value = valor;
}

function validarCpfCnpj(campo){
	const valor		= campo.value.replace( /\D/g, "" );
	let verificador = valor.substr( 0, ( valor.length - 2  ) );
	let indice		= valor.length == 11 ? 10 : 5;
	
	for( let i = 0; i < 2; i++ ){
		let calculo = 0;
		let digito	= 0;
		
		for( let c = 0; c < verificador.length; c++ ){
			calculo += parseInt( verificador[c] ) * indice;
			indice--;
			
			if( valor.length === 14 && ( ( c == 3 && i == 0 ) || ( c == 4 && i == 1 ) ) ){
				indice = 9;
			}
		}
		
		indice = valor.length == 11 ? 11 : 6;
		digito = calculo % 11;
		
		if( valor.length === 11 && ( ( 11 - digito ) < 10 ) ){
			digito = 11 - digito;
		}
		
		if( valor.length === 14 && digito > 1 ){
			digito = 11 - digito;
		}
		
		verificador += ( digito ).toString();
	}
	
	if( valor !== verificador ){
		let mensagem = valor.length > 11 ? "CNPJ" : "CPF";
		mensagem += " Invalido!";
		alert(mensagem);
	}
}
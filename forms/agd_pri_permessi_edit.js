/**
 * @properties={typeid:24,uuid:"2322D2D1-39C2-4608-9B71-BE57CED7D9B3"}
 */
function dc_save_validate(_foundset, program)
{
	try
	{
		 _super.dc_save_validate(foundset, program);
		
		 if(!(abilitatocartaceo || abilitatoinformatico))
			throw 'Impostare almeno una tipologia di archivio'
		if(!(abilitatoconservazione || abilitatolettura || abilitatostampa || abilitatotutto || abilitatoscrittura || abilitatocancellazione))
			throw 'Impostare almeno un permesso'
		}
		catch(ex)
	{
		globals.ma_utl_showErrorDialog(ex.message,'i18n:svy.fr.lbl.excuse_me')
		return -1
	}
		
	return 0
}

/**
 * @properties={typeid:24,uuid:"74FDE820-EA24-415A-84DE-758DE5553B93"}
 */
function gotoEdit()
{
	vClose = false;
	setElements()
}

/**
 * @properties={typeid:24,uuid:"E3778959-FB36-4071-AE47-E3FA47B69E01"}
 */
function setElements()
{
	var cartaceo = abilitatocartaceo && privacy_archiviofunzionipersone_to_privacy_dittaarchivio.cartaceo;
	var informatico = abilitatoinformatico && privacy_archiviofunzionipersone_to_privacy_dittaarchivio.informatico;
	var enabledCartaceo = privacy_archiviofunzionipersone_to_privacy_dittaarchivio.cartaceo === 1;
	var enabledInformatico = privacy_archiviofunzionipersone_to_privacy_dittaarchivio.informatico === 1;
	
	abilitatocartaceo = abilitatocartaceo || cartaceo// && !informatico;
	abilitatoinformatico = abilitatoinformatico || informatico //&& !cartaceo;
	
	elements.abilitatocartaceo.enabled = enabledCartaceo;
	elements.abilitatoinformatico.enabled = enabledInformatico;
	
	checkAllowedAll(abilitatotutto);
}

/**
 * @properties={typeid:24,uuid:"CDEAC848-1D96-4804-909C-D8EB41DC5730"}
 */
function checkAllowedAll(allowedAll)
{
	if(allowedAll)
	{
		// Rimuovi altri permessi eventualmente selezionati
		abilitatocancellazione = false;
		abilitatoconservazione = false;
		abilitatolettura = false;
		abilitatoscrittura = false;
		abilitatostampa = false;
		
		elements.abilitatocancellazione.enabled = false;
		elements.abilitatoconservazione.enabled = false;
		elements.abilitatolettura.enabled = false;
		elements.abilitatoscrittura.enabled = false;
		elements.abilitatostampa.enabled = false;
	}
	else
	{
		elements.abilitatocancellazione.enabled = true;
		elements.abilitatoconservazione.enabled = true;
		elements.abilitatolettura.enabled = true;
		elements.abilitatoscrittura.enabled = true;
		elements.abilitatostampa.enabled = true;
	}
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"5CC1DB69-C0B7-4490-BAC0-0D02CEA9D32F"}
 */
function onDataChangeTutto(oldValue, newValue, event) 
{
	checkAllowedAll(newValue);	
	return true;
}

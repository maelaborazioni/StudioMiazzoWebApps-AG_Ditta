/**
 * @param {JSFoundset} [_foundset]
 * @param {String} [_program]
 *
 * @properties={typeid:24,uuid:"94AB6951-18FD-4468-B2B0-A4630B5F5BA8"}
 */
function dc_save_validate(_foundset, _program)
{	
	return _super.dc_save_validate(_foundset != null ? _foundset : foundset, _program)	
}

/**
 * @properties={typeid:24,uuid:"0F10407E-67C7-4315-9F37-D80E76CF55B3"}
 */
function onRecordSelection(_event, _form)
{
	_super.onRecordSelection(_event,_form);
	
	// Disabilita data cessazione e carica quella del lavoratore, se interno
	if(personainterna)
	{
		var cessazioneLavoratore = null;
		if(idlavoratore)
			cessazioneLavoratore = ditte_funzionipersone_to_lavoratori.cessazione;
		
		var cessazioneAltraFigura = null;
		if(ditte_funzionipersone_to_ditte_funzionipersone_coincidecon)
			cessazioneAltraFigura = ditte_funzionipersone_to_ditte_funzionipersone_coincidecon.datacessazione;
		
		if(cessazioneLavoratore && cessazioneAltraFigura && cessazioneAltraFigura < cessazioneLavoratore)
			datacessazione = cessazioneAltraFigura;
		else if(cessazioneLavoratore)
			datacessazione = cessazioneLavoratore;
		else if(cessazioneAltraFigura)
			datacessazione = cessazioneAltraFigura;
	}
	
	setFields(personainterna);
}

/**
 * @properties={typeid:24,uuid:"EB3B50E7-0566-408C-B0E1-C4B8101CE81C"}
 */
function setFields(personaInterna)
{	
	if(elements.fld_datacessazione)
	{
		elements.fld_datacessazione.enabled = false;
	
		if(!personaInterna)
		{
			elements.fld_datacessazione.bgcolor = forms.svy_nav_style_custom.elements.fld_bg_unavailable.bgcolor;
		}
		else if((personainterna && idlavoratore) || coincidecon)
		{
			elements.fld_datacessazione.bgcolor = forms.svy_nav_style_custom.elements.fld_bg_default.bgcolor;
		}
	}
}

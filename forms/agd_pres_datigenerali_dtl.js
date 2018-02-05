
/**
 *
 * @param {Boolean} firstShow
 * @param {JSEvent} event
 * @param {Boolean} svyNavBaseOnShow
 *
 * @properties={typeid:24,uuid:"8FB79860-C645-4FE8-A642-163820FF27B4"}
 */
function onShowForm(firstShow, event, svyNavBaseOnShow) 
{
	_super.onShowForm(firstShow, event, svyNavBaseOnShow);
	var visibleCampiGestEst = globals.getTipologiaDitta(forms.agd_header_dtl.idditta) == globals.Tipologia.GESTITA_UTENTE ? true : false;
	elements.fld_esp_tr.visible = 
		elements.fld_esp_tr_conv.visible =
			elements.lbl_esp.visible = 
				elements.lbl_esp_tr.visible = 
					elements.lbl_esp_tr_conv.visible = visibleCampiGestEst; 
}

/**
 * Filtra i tracciati di conversione selezionabili dall'utente 
 * 
 * @param {JSFoundset} _fs
 *
 * @properties={typeid:24,uuid:"036E8160-7190-44C5-90D0-380CCE3C8C0B"}
 */
function FiltraTracciatoConversione(_fs)
{
	_fs.addFoundSetFilterParam('codcategoriasw','=','RP');
	_fs.addFoundSetFilterParam('ore_modalitagestione','=',1);
	return _fs;
}

/**
 * Aggiorna la selezione del tracciato 
 * 
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"7E55D212-4C58-448A-834B-5BF85EC3CBB0"}
 */
function AggiornaTracciatoConversione(_rec)
{
	ditte_presenze_to_ditte_gestioneesterna.idtracciatoconversione = _rec['idtabsw'];
}
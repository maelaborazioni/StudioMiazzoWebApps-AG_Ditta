/**
 * @properties={typeid:24,uuid:"781819B9-6818-4464-AA2F-94F9DFB4029C"}
 */
function filterData(fs)
{
	_super.filterData(ditte_to_ditte_sedi_domiciliofiscale && ditte_to_ditte_sedi_domiciliofiscale.ditte_sedi_to_ditte_indirizzi);
}

/**
 * @properties={typeid:24,uuid:"28C1C0D8-79AF-4C34-B5E7-CE0F618363EE"}
 */
function unfilterData(fs)
{
	_super.unfilterData(ditte_to_ditte_sedi_sedelegale && ditte_to_ditte_sedi_domiciliofiscale.ditte_sedi_to_ditte_indirizzi);
}
/**
 * @properties={typeid:24,uuid:"47551239-E950-457C-AA78-4221B301E5AC"}
 */
function getButtonObject()
{
	var _enabled = globals.getTipologiaDitta(idditta) == globals.Tipologia.ESTERNA
	               || globals.ma_utl_hasKey(globals.Key.GEST_ANAG_DITTA);
	
	var btnObj = _super.getButtonObject();
	
		btnObj.btn_new = { enabled: _enabled };
		btnObj.btn_edit = { enabled: _enabled };
		btnObj.btn_delete = { enabled: _enabled };
		btnObj.btn_duplicate = { enabled: false };
		
	return btnObj;
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"5EBB3CA2-B8DB-4121-9EF9-731EA24F61BF"}
*/
function dc_new(_event, _triggerForm, _forceForm) 
{
	var frm = forms.agd_indirizzo_edit;
	frm._isInEdit = false;
	frm._codTipoIndirizzo = globals.TipiIndirizzoDitta.DOMICILIO_FISCALE;
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Inserisci un nuovo indirizzo per il domicilio fiscale');
}

/**
*
* @param {JSEvent} _event
* @param {String} _triggerForm
* @param {String} _forceForm
*
* @properties={typeid:24,uuid:"55448972-229B-44B6-8BF3-3F11F19FE054"}
*/
function dc_edit(_event, _triggerForm, _forceForm) 
{
	var frm = forms.agd_indirizzo_edit;
	frm._isInEdit = true;
	frm._idIndEdit = ditte_to_ditte_indirizzi.iddittaindirizzo;
	frm._codTipoIndirizzo = globals.TipiIndirizzoDitta.DOMICILIO_FISCALE;
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Modifica l\'indirizzo per il domicilio fiscale');
}
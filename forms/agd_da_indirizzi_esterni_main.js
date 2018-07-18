/**
 * @param {JSFoundSet<db:/ma_anagrafiche/ditte_indirizzi>} [fs]
 * @AllowToRunInFind
 *
 * @properties={typeid:24,uuid:"0B9EBD5D-B73A-42D9-AE06-4EA395FCEFC6"}
 */
function filterData(fs)
{
	if(fs && fs.find())
	{
		fs.datadecorrenza = '^||<=' + globals.formatForFind(globals.TODAY);
		fs.datarilevazione = '^||<=' + globals.formatForFind(globals.TODAY);
		
		fs.search();
	}
}

/**
 * @param {JSFoundSet<db:/ma_anagrafiche/ditte_indirizzi>} [fs]
 *
 * @properties={typeid:24,uuid:"7B8B53B0-7BBD-4853-A90A-EF72179DAF79"}
 */
function unfilterData(fs)
{
	if(fs)
	{
		fs.loadAllRecords();
	}
}

/**
 * @properties={typeid:24,uuid:"2B5A4438-C678-4F99-9A99-547FDF855270"}
 */
function getEditFormName()
{
	return forms.agd_indirizzo_edit.controller.getName();
}

/**
 * @properties={typeid:24,uuid:"E52BA2D8-2842-49D9-8A16-5B59805BBD87"}
 */
function getEditFoundset()
{
	return ditte_to_ditte_indirizzi;
}

/**
 * @properties={typeid:24,uuid:"117CFE69-7434-4E24-A655-4EEB7B589F22"}
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



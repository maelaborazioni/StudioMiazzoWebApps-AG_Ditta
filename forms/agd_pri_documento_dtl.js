/**
 * @properties={typeid:24,uuid:"48D67E17-85DF-45F2-AE19-65162DE261CC"}
 */
function gotoEdit()
{
	_super.gotoEdit();
	
	controller.focusField(elements.fld_scadenza.getName(), true);

	var fs = privacy_datigenerali_to_tabprivacytipodocumento;
	elements.fld_relativoa.enabled = fs != null && fs.ammetterelativoa != null && fs.ammetterelativoa;
	elements.fld_scadenza.enabled = fs != null && fs.ammettescadenza != null && fs.ammettescadenza;
}

/**
 * @properties={typeid:24,uuid:"803E3B08-03F2-44A2-9A75-4147DC591420"}
 */
function dc_save_validate(fs, program)
{
	try
	{
		fs = fs && fs.getDataSource() == fs.getDataSource() ? fs : foundset;
		var prog = program ? program : 'AG_Req_Documentoprivacy';
		
		var success = _super.dc_save_validate(fs, prog) !== -1;
		if(success && checkDocumentoPrivacy(fs.getSelectedRecord()))
			return  0;
		
		return -1;
	}
	catch(ex)
	{
		globals.ma_utl_showErrorDialog(ex.message);
		return -1;
	}
}

/**
 * @properties={typeid:24,uuid:"C58A5E95-6B4B-4A58-9BE8-7018F15C7F7B"}
 */
function checkDocumentoPrivacy(record)
{
	var ammetteScadenza = record.privacy_datigenerali_to_tabprivacytipodocumento && record.privacy_datigenerali_to_tabprivacytipodocumento.ammettescadenza;
	if(ammetteScadenza)
		return globals.validateDocumentoPrivacy(record, 'datascadenza');
	
	var ammetteRelativoA = record.privacy_datigenerali_to_tabprivacytipodocumento && record.privacy_datigenerali_to_tabprivacytipodocumento.ammetterelativoa;
	if(ammetteRelativoA)
		return globals.validateDocumentoPrivacy(record, 'relativoa');
	
	return true;
}

/**
 * @param {JSEvent} _event
 * @param {String} _triggerForm
 * @param {String} _forceForm
 *
 * @properties={typeid:24,uuid:"1F005FFA-94C0-4B24-AC59-EA58719D11CA"}
 */
function dc_new(_event, _triggerForm, _forceForm)
{
	var pkDoc = showLkpDoc(_event);
	if(pkDoc)
	{
		addDocumentoPrivacy(pkDoc)
	}
}

/**
 * @properties={typeid:24,uuid:"1C529AB3-5DA7-494B-8CF9-D7617BAE67FB"}
 */
function dc_edit(event, triggerForm, forceForm)
{
	showEditForm(foundset, globals.Status.EDIT);
}

/**
 * @properties={typeid:24,uuid:"6E47C01C-D6FC-48A7-A27B-74FB9DC95AD4"}
 */
function addDocumentoPrivacy(id)
{
	try
	{
		databaseManager.setAutoSave(false);
	
		var record = foundset.getRecord(foundset.newRecord());
			record.codprivacytipodocumento = id;
			
		if(checkDocumentoPrivacy(record))
			showEditForm(foundset, globals.Status.ADD);
	}
	catch(ex)
	{
		application.output(ex, LOGGINGLEVEL.ERROR);
		databaseManager.revertEditedRecords();
		
		globals.ma_utl_showErrorDialog(ex.message);
	}
}

/**
 * @properties={typeid:24,uuid:"BE4E66F4-2671-4827-A45A-6AFDFD430A6C"}
 */
function showEditForm(fs, mode)
{
	var editForm = forms.agd_pri_documento_edit.controller.getName();		
	globals.ma_utl_showEditDialog(editForm, fs, null, 'Aggiungi documento privacy', mode);
}

/**
* @properties={typeid:24,uuid:"1EBFB000-6708-4EE8-8B8B-D31CF6D871BC"}
*/
function showLkpDoc(event)
{
	return globals.ma_utl_showLkpWindow(
			{
				 event: event
				,lookup: 'AG_Lkp_Documentoprivacy'
				,allowInBrowse: true
			}
		);
}

/**
 * @properties={typeid:24,uuid:"0AB2059A-A503-4048-B058-63386A71B0F9"}
 */
function checkDocumentoPrivacy(record)
{
	var ammetteScadenza = record.privacy_datigenerali_to_tabprivacytipodocumento && record.privacy_datigenerali_to_tabprivacytipodocumento.ammettescadenza;
	var ammetteRelativoA = record.privacy_datigenerali_to_tabprivacytipodocumento && record.privacy_datigenerali_to_tabprivacytipodocumento.ammetterelativoa;
	
	if(!(ammetteScadenza || ammetteRelativoA))
		return globals.validateDocumentoPrivacy(record);
//	if(ammetteScadenza)
//		return globals.validateDocumentoPrivacy(record, 'datascadenza');
//	
//	var ammetteRelativoA = record.privacy_datigenerali_to_tabprivacytipodocumento && record.privacy_datigenerali_to_tabprivacytipodocumento.ammetterelativoa;
//	if(ammetteRelativoA)
//		return globals.validateDocumentoPrivacy(record, 'relativoa');
	
	return true;
}

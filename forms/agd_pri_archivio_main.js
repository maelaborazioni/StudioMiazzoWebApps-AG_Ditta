/**
 * @properties={typeid:24,uuid:"3E6CDD0F-D930-48DD-BEA7-701CF15AC994"}
 */
function getButtonObject()
{
	var btnObj = _super.getButtonObject();
	
	btnObj.btn_duplicate = new Object();
	btnObj.btn_duplicate.enabled = false;
	
	return btnObj;
}

/**
 * @param {JSEvent} _event
 * @param {String} _triggerForm
 * @param {String} _forceForm
 *
 * @properties={typeid:24,uuid:"1D18FB78-9372-408B-A99A-71F04E4D0B5A"}
 */
function dc_new(_event, _triggerForm, _forceForm)
{
	addArchivio();
}

/**
 * @properties={typeid:24,uuid:"09DB86E2-AC30-4A28-9990-E2508E3F6E97"}
 */
function addArchivio()
{
	try
	{
		databaseManager.setAutoSave(false);
		
		foundset && foundset.newRecord();		
		showEditForm(foundset, globals.Status.ADD);
	}
	catch(ex)
	{
		application.output(ex, LOGGINGLEVEL.ERROR);
		databaseManager.revertEditedRecords();
	}
}

/**
 * @properties={typeid:24,uuid:"800F3883-7174-4E0C-B46D-DB0B0D3F32B5"}
 */
function dc_edit(event, triggerForm, forceForm)
{
	try
	{
		showEditForm(foundset, globals.Status.EDIT);
	}
	catch(ex)
	{
		application.output(ex, LOGGINGLEVEL.ERROR);
		databaseManager.revertEditedRecords();
	}
}

/**
 * @properties={typeid:24,uuid:"9FD744EA-A5DB-46D0-BDF3-C4E4EC8E1CB5"}
 */
function showEditForm(fs, mode)
{
	var editForm = forms.agd_pri_archivio_edit.controller.getName();
	globals.ma_utl_showEditDialog(editForm, fs, 'HR_Req_Archivio', 'Aggiungi archivio', mode);
}

/**
 * @param {JSFoundSet<db:/ma_hr/privacy_dittaarchivio>} fs
 * @param {Boolean} multidelete
 * 
 * @properties={typeid:24,uuid:"6806537F-01D9-41C8-A7EF-CB2A973A2F9F"}
 */
function dc_delete_pre(fs, multidelete)
{
	if(_super.dc_delete_pre(fs, multidelete) !== -1)
	{
		var responsabiliFs = fs && fs.privacy_dittaarchivio_to_privacy_archiviofunzionipersone;
		if(responsabiliFs && responsabiliFs.loadAllRecords() && responsabiliFs.getSize() > 0)
		{
			var answer = globals.ma_utl_showYesNoQuestion('I responsabili correntemente assegnati all\'archivio saranno disassociati.\nContinuare?');
			return answer ? 0 : -1;
		}
		
		return 0;
	}
	
	return -1;
}

/**
 * @properties={typeid:24,uuid:"A51F08C8-C9BA-444C-9061-BE299920057E"}
 */
function gotoBrowse()
{
	_super.gotoBrowse();
	foundset.sort('codice asc');
}

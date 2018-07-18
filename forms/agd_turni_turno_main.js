/**
 * @properties={typeid:24,uuid:"96E3C0DE-181C-4A11-BAE4-CCB8080DA4E8"}
 */
function gotoEdit()
{
	_super.gotoEdit()
	elements.turno_tbl_tabless.enabled = false
}

/**
 * @properties={typeid:24,uuid:"EC4E61A8-65D8-4F1D-8BF6-EC3B5AD512BF"}
 */
function gotoBrowse()
{
	_super.gotoBrowse()
	elements.turno_tbl_tabless.enabled = true
	
	foundset.sort('codice asc');
}

/**
 * @properties={typeid:24,uuid:"CC559493-268E-4BF3-ABA4-D360540FAC6E"}
 */
function getButtonObject()
{
	var _btnObj = _super.getButtonObject()
	
	_btnObj.btn_duplicate = new Object()
	_btnObj.btn_duplicate.enabled = false
	
	return _btnObj
}

/**
 * @param {JSEvent} _event
 * @param {String} _triggerForm
 * @param {String} _forceForm
 *
 * @properties={typeid:24,uuid:"90192814-402B-4D18-944B-664F2633893D"}
 */
function dc_new(_event, _triggerForm, _forceForm)
{
	addTurno()
}

/**
 * @properties={typeid:24,uuid:"0681AAA3-4A94-4EB1-954B-E5F4BDFA457E"}
 */
function dc_edit(event, triggerForm, forceForm)
{
	editTurno();
}

/**
 * @properties={typeid:24,uuid:"C5C85C99-36CF-4CC2-B951-BEAA6063DAE7"}
 */
function addTurno()
{
	databaseManager.setAutoSave(false);
	foundset.newRecord();
	showEditForm(foundset);
}

/**
 * @properties={typeid:24,uuid:"2754F29B-3453-4FCA-8980-712D04F46C6A"}
 */
function editTurno()
{
	databaseManager.setAutoSave(false);
	showEditForm(foundset);
}

/**
 * @properties={typeid:24,uuid:"66677028-D3AC-492E-ACD4-C917A7AAF073"}
 */
function showEditForm(fs)
{
	var editForm = forms.agd_turno_edit.controller.getName();
	
	globals.ma_utl_showFormInDialog(editForm, 'Aggiungi turno', fs);
	globals.ma_utl_setStatus(globals.Status.EDIT, editForm, null, 'AG_Req_Turno');
}

/**
 * @param {JSFoundSet<db:/ma_anagrafiche/ditte_turni>} fs
 * @param {Boolean} multiDelete
 *
 * @properties={typeid:24,uuid:"9638B407-90E2-4C3B-BF0E-F69274B494F6"}
 */
function dc_delete_pre(fs, multiDelete)
{
	if(_super.dc_delete_pre(fs,multiDelete) == -1)
		return -1
		
	if(fs.getSize() > 0)
	{
		var answer
		if(fs.ditte_turni_to_ditte && fs.ditte_turni_to_ditte.getSize() > 0)
		{
			var sedi = globals.foundsetToArray(fs.ditte_turni_to_ditte.ditte_to_ditte_sedi_sedeoperativa,'iddittasede')
			var sediturniFs = databaseManager.getFoundSet(fs.ditte_turni_to_ditte_sediturni.getDataSource())
			if(
				   sediturniFs.addFoundSetFilterParam('iddittasede','IN',sedi)
				&& sediturniFs.addFoundSetFilterParam('iddittaturno','=',fs.iddittaturno)
				&& sediturniFs.loadAllRecords()
				&& sediturniFs.getSize() > 0)
			{
				answer = globals.ma_utl_showYesNoQuestion('Le assegnazioni alle sedi del turno selezionato saranno rimosse. Continuare?');
				if(!answer)
				{
					return -1
				}
			}
		}
		//TODO rimuove anche i responsabili storicizzati!!! Da rivedere!!!
		var responsabiliFs = fs.ditte_turni_to_ditte_funzionipersoneturni;
		if(responsabiliFs != null && responsabiliFs.getSize() > 0)
		{
			answer = globals.ma_utl_showYesNoQuestion('I responsabili correntemente assegnati al turno selezionato saranno rimossi. Continuare?', 'Attenzione...')
			if(!answer)
			{
				return -1
			}
		}
	}
	
	return 0
}

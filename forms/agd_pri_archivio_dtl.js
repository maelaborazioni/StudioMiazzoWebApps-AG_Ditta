/**
 * @properties={typeid:24,uuid:"CE5B50CE-8DE9-4F7E-AC25-201389D0DDE4"}
 */
function gotoEdit()
{
	_super.gotoEdit()
	controller.focusField(elements.codice.getName(), true)
	
	if(globals.nav.mode == 'add')
	{
		cartaceo = 1
		informatico = 1
	}
}

/**
 * @param {JSFoundSet<db:/ma_hr/privacy_dittaarchivio>} _foundset
 * @param {String} [_program]
 *
 * @properties={typeid:24,uuid:"E6613DE1-6C32-4EE3-A846-BDC315BFF7D4"}
 */
function dc_save_validate(_foundset, _program)
{	
	try
	{
		_program = 'HR_Req_Archivio';
		
		return (_super.dc_save_validate(_foundset, _program) !== -1 && globals.validateArchivio(_foundset.getSelectedRecord())) ? 0 : -1
	}
	catch(ex)
	{
		globals.ma_utl_showErrorDialog(ex.message,'i18n:svy.fr.lbl.excuse_me')
		return -1
	}
}

/**
 * @param {JSFoundSet<db:/ma_hr/privacy_dittaarchivio>} fs
 *
 * @properties={typeid:24,uuid:"EA7C01A9-098D-457C-A4CF-750C007BF278"}
 */
function dc_save_post(fs)
{
	if(_super.dc_save_post(fs) !== -1)
	{
		var responsabiliFs = fs.privacy_dittaarchivio_to_privacy_archiviofunzionipersone;
		if(responsabiliFs)
		{
			for(var r = 1; r <= responsabiliFs.getSize(); r++)
			{
				var record = responsabiliFs.getRecord(r);
				
				/**
				 * Se l'archivio lo prevede, abilita il responsabile associato alla tipologia in due casi
				 * 
				 * 1- quando era già abilitato
				 * 2- quando non era abilitato ma la tipologia in questione è la sola disponibile
				 */
				record.abilitatocartaceo = fs.cartaceo && (record.abilitatocartaceo || !fs.informatico);
				record.abilitatoinformatico = fs.informatico && (record.abilitatoinformatico || !fs.cartaceo);
			}
		}
	}
	else
	{
		return -1;
	}
	
	return 0;
}

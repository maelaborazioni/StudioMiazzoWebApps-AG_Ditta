/**
 * @properties={type:12,typeid:36,uuid:"94EE62A1-4BB4-47BE-80E4-2549C00DDFA3"}
 */
function tipoliquidazionedesc()
{
	if(tipoliquidazione == 'A')
		return 'Periodo';
	return '';
}

/**
 * @properties={type:12,typeid:36,uuid:"BEF6C7B5-9BE0-4359-BE80-225A55D77884"}
 */
function unitadimisuradescr()
{
	if(unitadimisura == 'O')
		return 'Ore';
	return 'Giorni';
}

/**
 * @properties={type:12,typeid:36,uuid:"616C4BDA-98A3-4F8C-997E-B60510CB7FCA"}
 */
function classirateo()
{
	var fs = ditte_ratei_to_ditte_rateiclassimaturazione;
	var strClassiRateo = '';
	for(var i=1; i<=fs.getSize(); i++)
	{
		strClassiRateo += fs.classerateo;
		if(i!=fs.getSize())
			strClassiRateo += ',';
	}
	return strClassiRateo;
}

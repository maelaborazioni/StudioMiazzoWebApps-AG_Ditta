/**
 * @properties={typeid:24,uuid:"157D3897-E571-473E-8834-7D81B41B0D4D"}
 */
function isHistoryEnabled()
{
	if(tipologia != 0)
		return 0;
	else
	    return ditte_to_ditte_storico && ditte_to_ditte_storico.abilitatastorico;
}

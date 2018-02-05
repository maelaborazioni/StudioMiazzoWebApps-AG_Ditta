/**
 * @properties={type:12,typeid:36,uuid:"043AA6EF-9DC9-45A4-9346-49B00B30708C"}
 */
function festapatronale_string()
{
	if(festapatronale)
	{
		return festapatronale.substring(0, 2) + '/' + festapatronale.substring(2, 4) + '/' + globals.TODAY.getFullYear();
	}
	else
	{
		return null;
	}
}

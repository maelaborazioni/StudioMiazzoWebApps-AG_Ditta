/**
 * @properties={typeid:24,uuid:"85760C14-6002-4C04-8C14-8F6E7119AE2A"}
 */
function onShowForm(firstShow,event)
{
	_super.onShowForm(firstShow,event,true);
	foundset.sort('codtiporecapito asc');
}

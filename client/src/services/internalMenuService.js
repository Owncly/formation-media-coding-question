const internalMenuService = async (menuData) => {
  try {
    // Step 1: Check for existing records
    const res = await fetch('/records');
    const existing = await res.json();

    if (existing.length === 0) {
      //Insert if none exist
      await fetch('/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuData),
      });
    } else {
      //Update the first existing record
      const recordId =
        typeof existing[0]._id === 'object' && existing[0]._id.$oid
          ? existing[0]._id.$oid
          : existing[0]._id;

      await fetch(`/records/${recordId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuData),
      });
    }
  } catch (err) {
    console.error('internalMenuService failed:', err);
  }
};

export default internalMenuService;
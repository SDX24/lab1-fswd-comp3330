const { uploadUrl, key } = await fetch('/api/upload/sign', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ filename: file.name, type: file.type }),
}).then((res) => res.json())

await fetch(uploadUrl, {
  method: 'PUT',
  headers: { 'Content-Type': file.type },
  body: file,
})

await fetch(`/api/expenses/${expenseId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ fileKey: key }),
})

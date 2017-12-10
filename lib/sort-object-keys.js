'use babel'

import { CompositeDisposable } from 'atom'
import { sortObjectKeys } from './utils'

function init(editor) {
  const selectedText = editor.getSelectedText()

  try {
    const textParsed = JSON.parse(selectedText.replace(/\'/g, '\"'))
    const objectKeysSorted = sortObjectKeys(textParsed)

    const textToInsert = JSON.stringify(selectedText.replace(/\"/g, '\''))
    editor.insertText(textToInsert)
  } catch (err) {
    atom.notifications.addError('Sort object keys',
      { detail: 'The selected text is not a valid object' }
    )
  }
}

export function deactivate() {
  this.subscriptions.dispose()
}

export function activate() {
  this.subscriptions = new CompositeDisposable()

  this.subscriptions.add(atom.commands.add('atom-workspace', 'sort-object-keys:toggle', () => {
    const editor = atom.workspace.getActiveTextEditor()

    if (editor) {
      init(editor)
    }
  }))
}

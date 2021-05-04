// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "my-debug-texteditor" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('comment-frame-generator.generateFrame', () => {
		// The code you place here will be executed every time your command is executed

		const editor = vscode.window.activeTextEditor;


		if (editor !== undefined) {
			const document = editor.document;

			// get text on current line
			const text = document.lineAt(editor.selection.active).text;

			const comment_matcher = text.match(/^\s*(#.*)/);

			let comment_content = new String("test");
			let frame_char = new String("#");
			if (comment_matcher !== null) {
				const begen_content_idx = text.indexOf('#');
				const indent_str = text.substr(0, begen_content_idx);

				comment_content = comment_matcher[1];
				const content_length = comment_content.length;
				const frame_str = frame_char.repeat(content_length);

				const frame_string = indent_str + frame_str;


				// get current line number
				const cursor_line = editor.selection.active.line;

				// create text insert position object
				const pos_after = new vscode.Position(cursor_line + 1, 0);
				const pos_before = new vscode.Position(cursor_line, 0);

				const func = function (editBuilder: vscode.TextEditorEdit): void {
					editBuilder.insert(pos_after, frame_string + "\n");
					editBuilder.insert(pos_before, frame_string + "\n");

				}
				editor.edit(func);
				vscode.window.showInformationMessage(
					"SUCCEEDED: text flame generated."
				);
			} else {
				vscode.window.showInformationMessage(
					"FAILED: text on cursor line does not start \"#\"."
				);
			};
		}

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }


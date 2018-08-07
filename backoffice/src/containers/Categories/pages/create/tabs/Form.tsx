import * as React from 'react';
import { FormGroup, InputGroup, HTMLSelect, Button } from '@blueprintjs/core';

export default class Form extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const {
			disabled,
			errors,
			onChange,
			onSubmit,
			touched,
			isValid,
			loading,
			onBlur,
			values: { name, parentId },
		} = this.props;
		console.log(this.props);
		return (
			<div className="container">
				<FormGroup
					label="Category Name"
					labelFor="name"
					helperText={
						touched.name && errors.name
							? errors.name
							: 'This will be used to generate the category url slug'
					}
					intent={touched.name && errors.name ? 'danger' : undefined}>
					<InputGroup
						id="name"
						name="name"
						required={true}
						autoFocus={true}
						type="text"
						autoComplete="off"
						minLength={3}
						value={name}
						onChange={onChange}
						disabled={disabled}
						onBlur={onBlur}
					/>
				</FormGroup>
				<FormGroup
					label="Parent Category"
					labelFor="parentId"
					helperText={
						touched.parentId && errors.parentId
							? errors.parentId
							: 'Your newly create category will be a sub category of this'
					}
					intent={
						touched.parentId && errors.parentId
							? 'danger'
							: undefined
					}>
					<HTMLSelect
						id="parentId"
						name="parentId"
						fill={true}
						disabled={disabled}
						onBlur={onBlur}
						onChange={onChange}>
						<option>-- select --</option>
						{this.props.categories.map((category: any) => (
							<option
								value={category.id}
								key={category.id}
								defaultValue={parentId}>
								{category.name}
							</option>
						))}
					</HTMLSelect>
				</FormGroup>
				<FormGroup>
					<Button
						intent="primary"
						icon="arrow-right"
						type="submit"
						fill={true}
						disabled={!isValid || loading}
						loading={loading}
						onClick={onSubmit}
					/>
				</FormGroup>
			</div>
		);
	}
}

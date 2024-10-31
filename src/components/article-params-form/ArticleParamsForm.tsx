import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import React, { useState, useEffect, useRef } from 'react';
// import {
// 	ArticleStateType,
// 	OptionType,
// 	backgroundColors,
// 	contentWidthArr,
// 	defaultArticleState,
// 	fontColors,
// 	fontFamilyOptions,
// 	fontSizeOptions } from 'src/constants/articleProps';
// import { Text } from '../text';
// import { Select } from '../select';
// import { RadioGroup } from '../radio-group';
// import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';

// type Props = {
// 	onChange: ({}: ArticleStateType) => void;
// };

export const ArticleParamsForm = () => {
	const [isOpen, setOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	// const [params, setParams] = useState(defaultArticleState);

	const handleClick = () => {
		setOpen(!isOpen);
	};

	// function handleOptionChange(key: string, option: OptionType) {
	// 	setParams({ ...params, [key]: option });
	// }

	let className = styles.container;

	if (isOpen) {
		className = className + ' ' + styles.container_open;
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	return (
		<>
			<ArrowButton onClick={handleClick} />
			<aside ref={formRef} className={className}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

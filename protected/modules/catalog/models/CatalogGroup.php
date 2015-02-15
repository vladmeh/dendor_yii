<?php

/**
 * This is the model class for table "CatalogGroup".
 *
 * The followings are the available columns in table 'CatalogGroup':
 * @property integer $id
 * @property integer $parent_id
 * @property string $image
 * @property string $url
 * @property integer $active
 * @property integer $sorting
 * @property integer $page_size
 * @property integer $deleted
 *
 * The followings are the available columns in table 'CatalogGroupTranslate':
 * @property string $name
 * @property string $description
 * @property string $meta_title
 * @property string $meta_description
 * @property string $meta_keywords

 * The followings are the available model relations:
 * @property CatalogGroupTranslate[] $catalogGroupTranslates
 */
class CatalogGroup extends CActiveRecord
{

	/**
	 * Default page size.
	 */
	public $defaultPageSize = 10;

	/**
	 * @var array
	 */
	private $_list = array();

	/**
	 * Translate-table
	 */
	public $name;
	public $description;
	public $meta_title;
	public $meta_description;
	public $meta_keywords;

	/**
	 * Name of the translations model.
	 */
	public $translateModelName = 'CatalogGroupTranslate';

	/**
	 * Upload image file.
	 */
	public $img;


	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return CatalogGroup the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'CatalogGroup';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('name, url', 'required'),
			array('url', 'LocalUrlValidator'),
			array('url', 'unique'),
			array('parent_id, active, sorting, page_size, deleted', 'numerical', 'integerOnly'=>true),
			array('name, meta_title, meta_description, meta_keywords, image, url', 'length', 'max'=>255),
			array('description', 'safe'),
			array('img','file', 'safe' => true, 'allowEmpty'=>true, 'types'=>'jpg, gif, png', 'maxSize' => 1048576),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, parent_id, image, url, active, sorting, page_size, deleted', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			//'catalogGroupTranslates' => array(self::HAS_MANY, 'CatalogGroupTranslate', 'object_id'),
			'translate'=>array(self::HAS_ONE, $this->translateModelName, 'object_id'),
			// 'pages'=>array(self::HAS_MANY, 'News', 'group_id'),
			// 'pageCount'=>array(self::STAT, 'News', 'group_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'parent_id' => Yii::t('admin', 'parent_category'),
			'image' => Yii::t('admin', 'image'),
			'img' => Yii::t('admin', 'image'),
			'url' => Yii::t('admin', 'url'),
			'active' => 'Active',
			'sorting' => 'Sorting',
			'page_size' =>  Yii::t('admin', 'page_size'),
			'deleted' => 'Deleted',
			//CatalogGroupTranslate
			'name' => Yii::t('admin', 'title'),
			'description' => Yii::t('admin', 'description'),
			'meta_title' => Yii::t('admin', 'meta_title'),
			'meta_description' => Yii::t('admin', 'meta_description'),
			'meta_keywords' => Yii::t('admin', 'meta_keywords'),
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->with = array('translate');

		$criteria->compare('t.id',$this->id);
		$criteria->compare('t.parent_id',$this->parent_id);
		$criteria->compare('translate.name',$this->name,true);
		$criteria->compare('t.image',$this->image,true);
		$criteria->compare('t.url',$this->url,true);
		$criteria->compare('translate.description',$this->description,true);
		$criteria->compare('translate.meta_title',$this->meta_title,true);
		$criteria->compare('translate.meta_description',$this->meta_description,true);
		$criteria->compare('translate.meta_keywords',$this->meta_keywords,true);
		$criteria->compare('t.active',$this->active);
		$criteria->compare('t.sorting',$this->sorting);
		$criteria->compare('t.page_size',$this->page_size);
		$criteria->compare('t.deleted',$this->deleted);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	public function behaviors()
	{
		return array(
			'STranslateBehavior'=>array(
				'class'=>'ext.behaviors.TranslateBehavior',
				'translateAttributes'=>array(
					'name',
					'description',
					'meta_title',
					'meta_description',
					'meta_keywords',
				),
			),
		);
	}

	public function beforeValidate()
	{
		if (empty($this->url))
		{
			Yii::import('ext.SlugHelper.SlugHelper');
			$this->url = SlugHelper::run($this->name);
		}
		return parent::beforeValidate();
	}

	public function beforeSave()
	{
		if($this->meta_title === '')
			$this->meta_title = $this->name;

		if($this->meta_description === '')
			$this->meta_description = substr($this->description, 0, 120);

		/*if (empty($this->url))
		{
			Yii::import('ext.SlugHelper.SlugHelper');
			$this->url = SlugHelper::run($this->name);
		}*/

		if (empty($this->page_size)) {
			$this->page_size = $this->defaultPageSize;
		}

		return parent::beforeSave();
	}

	/**
	 * Find category by url.
	 * Scope.
	 * @return Page
	 */
	public function withUrl($url)
	{
		$this->getDbCriteria()->mergeWith(array(
			'condition'=>'url=:url',
			'params'=>array(':url'=>$url)
		));

		return $this;
	}

	/**
	 * Get list to form object on front
	 * @return array
	 */
	public function getListCategory()
	{
		$this->_list[0]='...';

		$aCategory = CatalogGroup::model()->findAll();
		foreach ($aCategory as $oCategory) {
			$this->_list[$oCategory->id]=$oCategory->name;
		}
		return $this->_list;
	}

}

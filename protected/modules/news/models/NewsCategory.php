<?php

Yii::import('application.modules.news.models.NewsCategoryTranslate');

/**
 * This is the model class for table "NewsCategory".
 *
 * The followings are the available columns in table 'NewsCategory':
 * @property integer $id
 * @property integer $parent_id
 * @property string $url
 * @property string $full_url
 * @property string $layout
 * @property string $view
 * @property string $created
 * @property string $updated
 * @property integer $page_size
 *
 * The followings are the available columns in table 'NewsCategoryTranslate':
 * @property string $meta_title
 * @property string $meta_description
 * @property string $meta_keywords
 * @property integer $page_size
 * @property string $created
 * @property string $updated
 *
 *
 * The followings are the available model relations:
 * @property NewsCategoryTranslate[] $newsCategoryTranslates
 */
class NewsCategory extends CActiveRecord
{

	/**
	 * Default page size.
	 */
	public $defaultPageSize = 10;

	/**
	 * Set level on PageCategoryTree::buildTree()
	 */
	public $level;

	/**
	 * Set temp path on PageCategoryTree::buildTree()
	 */
	public $path;

	/**
	 * @var string name prefixed with "-"
	 */
	public $_nameWithLevel;

	/**
	 * Translate-able
	 */
	public $name;
	public $description;
	public $meta_title;
	public $meta_description;
	public $meta_keywords;

	public $translateModelName = 'NewsCategoryTranslate';

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return NewsCategory the static model class
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
		return 'NewsCategory';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		/*// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('parent_id, page_size', 'numerical', 'integerOnly'=>true),
			array('url, layout, view', 'length', 'max'=>255),
			array('full_url, created, updated', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, parent_id, url, full_url, layout, view, created, updated, page_size', 'safe', 'on'=>'search'),
		);*/
		return array(
			array('description, layout, view', 'type', 'type'=>'string'),
			array('name', 'required'),
			array('url', 'LocalUrlValidator'),
			array('parent_id, page_size', 'numerical', 'integerOnly'=>true),
			array('name, url, layout, view, meta_title, meta_description, meta_keywords', 'length', 'max'=>255),
			// The following rule is used by search().
			array('id, parent_id, name, url, description, layout, view, meta_title, meta_description, meta_keywords, created, updated', 'safe', 'on'=>'search'),
		);
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
	 * Find category by full_url.
	 * Scope.
	 * @return Page
	 */
	public function withFullUrl($url)
	{
		$this->getDbCriteria()->mergeWith(array(
			'condition'=>'full_url=:url',
			'params'=>array(':url'=>$url)
		));

		return $this;
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			//'newsCategoryTranslates' => array(self::HAS_MANY, 'NewsCategoryTranslate', 'object_id'),
			'translate'=>array(self::HAS_ONE, $this->translateModelName, 'object_id'),
			'pages'=>array(self::HAS_MANY, 'News', 'category_id'),
			'pageCount'=>array(self::STAT, 'News', 'category_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'parent_id' => 'Parent',
			'url' => 'Url',
			'full_url' => 'Full Url',
			'layout' => 'Layout',
			'view' => 'View',
			'created' => 'Created',
			'updated' => 'Updated',
			'page_size' => 'Page Size',
			//NewsCategoryTranslate
			'name' => 'Name',
			'description' => 'Description',
			'meta_title' => 'Meta Title',
			'meta_description' => 'Meta Description',
			'meta_keywords' => 'Meta Keywords',
		);
	}

	/**
	 * Get all categories list to display in dropdown.
	 * @param type $excludeId Exclude self model
	 * @return array id=>name
	 */
	public static function keyValueList()
	{
		$models = PageCategory::model()->findAll();
		$tree = new PageCategoryTree($models);
		return CHtml::listData($tree->buildTree(), 'id', 'nameWithLevel');
	}

	/**
	 * Get category name to display in dropdown list.
	 * @return string "-- CategoryName"
	 */
	public function getNameWithLevel()
	{
		return str_repeat('-', $this->level).' '.$this->name;
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->with = array('translate');

		$criteria->compare('id',$this->id);
		$criteria->compare('parent_id',$this->parent_id);
		$criteria->compare('translate.name',$this->name,true);
		$criteria->compare('url',$this->url,true);
		$criteria->compare('translate.description',$this->description,true);
		$criteria->compare('layout',$this->layout,true);
		$criteria->compare('view',$this->view,true);
		$criteria->compare('translate.meta_title',$this->meta_title,true);
		$criteria->compare('translate.meta_description',$this->meta_description,true);
		$criteria->compare('translate.meta_keywords',$this->meta_keywords,true);
		$criteria->compare('created',$this->created,true);
		$criteria->compare('updated',$this->updated,true);

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

	public function beforeSave()
	{
		if(!$this->created && $this->isNewRecord)
			$this->created = date('Y-m-d H:i:s');
		if(!$this->updated)
			$this->updated = date('Y-m-d H:i:s');

		if (empty($this->url))
		{
			Yii::import('ext.SlugHelper.SlugHelper');
			$this->url = SlugHelper::run($this->name);
		}

		/*// Check if url available
		if($this->isNewRecord)
		{
			$test = PageCategory::model()
				->withUrl($this->url)
				->count('parent_id=:parent_id', array(
					':parent_id'=>$this->parent_id
				));
		}
		else
		{
			$test = PageCategory::model()
				->withUrl($this->url)
				->count('id!=:id AND parent_id=:parent_id', array(
					':id'=>$this->id,
					':parent_id'=>$this->parent_id,
				));
		}

		if ($test > 0)
			$this->url .= '-'.date('YmdHis');*/

		return parent::beforeSave();
	}

	/**
	 * Delete category pages and childs.
	 * @return boolean
	 */
	public function beforeDelete()
	{
		// Delete pages
		$pages = $this->pages;
		if ($pages)
		{
			foreach($pages as $p)
				$p->delete();
		}

		// Delete all child categories
		$tree = new NewsCategoryTree();
		$tree = $tree->buildTree($this->id);

		if (count($tree) > 0)
		{
			foreach($tree as $child)
				$child->delete();
		}

		return parent::beforeDelete();
	}

	/**
	 * Count and cache categories by url
	 *
	 * @param $pathInfo
	 * @return int|mixed
	 */
	public static function countByPath($pathInfo)
	{
		$count=Yii::app()->cache->get(__CLASS__.$pathInfo);

		if($count===false)
		{
			$model = NewsCategory::model()
				->withFullUrl($pathInfo)
				->find();

			if($model)
				$count=1;
			else
				$count=0;
		}

		Yii::app()->cache->set('news_category_'.$pathInfo, $count, 3600);

		return $count;
	}

	/**
	 * Generate admin link to edit category.
	 * @return type
	 */
	public function getUpdateLink()
	{
		return CHtml::link(CHtml::encode($this->name), array('/news/admin/category/update', 'id'=>$this->id));
	}

	/**
	 * Get url to view object on front
	 * @return string
	 */
	public function getViewUrl()
	{
		return urldecode(Yii::app()->createUrl('news/news/list', array('url'=>$this->full_url)));
	}

	public function afterSave()
	{
		Yii::app()->cache->delete('news_category_'.$this->url);
		return parent::afterSave();
	}

	public function afterDelete()
	{
		Yii::app()->cache->delete('news_category_'.$this->url);
		return parent::afterSave();
	}

	/**
	 * @return string
	 */
	public function __toString()
	{
		return $this->name;
	}

}

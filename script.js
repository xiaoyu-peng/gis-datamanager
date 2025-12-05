// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const parentNavLinks = document.querySelectorAll('.nav-link.parent');
    const subNavLinks = document.querySelectorAll('.nav-link[data-section]');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('page-title');
    
    // GEP认证页面特定元素
    const yearSelect = document.getElementById('year-select');
    
    // 主题切换元素
    const themeToggle = document.getElementById('theme-toggle');
    
    // 检查本地存储中的主题偏好
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
    }
    
    // 主题切换事件
    themeToggle.addEventListener('change', function() {
        const isDarkMode = this.checked;
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
    
    // 父级导航点击事件 - 展开/折叠子菜单
    parentNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navItem = this.closest('.nav-item');
            navItem.classList.toggle('expanded');
        });
    });
    
    // 子级导航点击事件 - 切换内容区域
    subNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取目标section ID
            const targetSection = this.getAttribute('data-section');
            
            // 移除所有导航链接的active状态
            subNavLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // 移除所有内容区域的active状态
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // 添加当前导航链接的active状态
            this.classList.add('active');
            
            // 显示对应的内容区域
            const sectionToShow = document.getElementById(targetSection);
            if (sectionToShow) {
                sectionToShow.classList.add('active');
                
                // 更新页面标题
                const navText = this.querySelector('.nav-text').textContent;
                pageTitle.textContent = navText;
            }
        });
    });
    
    // 默认展开第一个父级菜单
    const firstParentNav = parentNavLinks[0];
    if (firstParentNav) {
        const firstNavItem = firstParentNav.closest('.nav-item');
        firstNavItem.classList.add('expanded');
    }
    
    // 默认激活第一个子导航链接
    const firstSubNav = subNavLinks[0];
    if (firstSubNav) {
        firstSubNav.classList.add('active');
    }
    
    // 年份选择器事件
    if (yearSelect) {
        yearSelect.addEventListener('change', function() {
            const selectedYear = this.value;
            // 这里可以添加年份切换的逻辑，比如更新数据
            console.log('切换到年份：', selectedYear);
            // 目前是模拟数据，实际项目中可以根据年份从服务器获取数据
        });
    }
    
    // GEP数据总览年份选择器
    const gepYearSelect = document.getElementById('gep-year-select');
    if (gepYearSelect) {
        gepYearSelect.addEventListener('change', function() {
            const selectedYear = this.value;
            console.log('GEP数据总览切换到年份：', selectedYear);
            // 这里可以添加年份切换的逻辑，比如更新数据
        });
    }
    
    // TAP切换功能
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.content-tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            
            // 移除所有按钮的active状态
            tabBtns.forEach(tabBtn => {
                tabBtn.classList.remove('active');
            });
            
            // 移除所有面板的active状态
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // 添加当前按钮的active状态
            this.classList.add('active');
            
            // 显示对应的面板
            const targetPane = document.getElementById(city);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
    
    // GEP数据总览卡片操作按钮
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            const card = this.closest('.data-card');
            const cardTitle = card.querySelector('.card-title').textContent.trim();
            
            console.log(`点击了${cardTitle}卡片的${btnText}按钮`);
            
            // 根据按钮类型执行不同操作
            switch(btnText) {
                case '查看':
                    // 查看操作逻辑
                    console.log(`查看${cardTitle}数据`);
                    break;
                case '上传':
                    // 上传操作逻辑
                    console.log(`上传${cardTitle}数据`);
                    break;
                case '清空':
                    // 清空操作逻辑
                    console.log(`清空${cardTitle}数据`);
                    break;
            }
        });
    });
    
    // 导出数据按钮功能实现
    const exportBtn = document.querySelector('.btn-orange');
    const dataCheckboxes = document.querySelectorAll('.card-checkbox input[type="checkbox"]');
    
    // 检查复选框状态并更新按钮状态
    function updateExportBtnState() {
        if (exportBtn) {
            const isAnyChecked = Array.from(dataCheckboxes).some(checkbox => checkbox.checked);
            if (isAnyChecked) {
                exportBtn.classList.remove('btn-disabled');
                exportBtn.disabled = false;
            } else {
                exportBtn.classList.add('btn-disabled');
                exportBtn.disabled = true;
            }
        }
    }
    
    // 初始化按钮状态
    updateExportBtnState();
    
    // 为每个复选框添加change事件监听器
    dataCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateExportBtnState);
    });
    
    // 导出数据按钮点击事件
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            if (!this.disabled) {
                console.log('导出数据');
                // 导出数据逻辑
            }
        });
    }
    
    // 价值量数据卡片点击事件
    const valueDataCard = document.querySelector('.data-card:nth-child(1)');
    if (valueDataCard) {
        valueDataCard.addEventListener('click', function(e) {
            // 检查点击的是不是复选框或操作按钮
            if (!e.target.closest('.card-checkbox') && !e.target.closest('.action-btn')) {
                // 隐藏所有内容区域
                contentSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // 显示价值量数据详情页面
                const valueDataDetailSection = document.getElementById('value-data-detail');
                if (valueDataDetailSection) {
                    valueDataDetailSection.classList.add('active');
                }
                
                // 更新页面标题
                if (pageTitle) {
                    pageTitle.textContent = '生态产品物质质量与价值量统计';
                }
            }
        });
    }
    
    // 价值量数据详情页面交互
    // 数据分类标签切换
    function setupCategoryTabs() {
        const categoryTabs = document.querySelectorAll('.category-tab');
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有标签的active状态
                categoryTabs.forEach(t => t.classList.remove('active'));
                // 添加当前标签的active状态
                this.classList.add('active');
                console.log('切换到数据分类:', this.textContent);
                // 这里可以添加筛选数据的逻辑
            });
        });
    }
    
    // 价值类别标签切换
    function setupValueTabs() {
        const valueTabs = document.querySelectorAll('.value-tab');
        valueTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有标签的active状态
                valueTabs.forEach(t => t.classList.remove('active'));
                // 添加当前标签的active状态
                this.classList.add('active');
                console.log('切换到价值类别:', this.textContent);
                // 这里可以添加筛选数据的逻辑
            });
        });
    }
    
    // 搜索功能
    function setupSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                const searchText = searchInput.value.trim();
                console.log('搜索内容:', searchText);
                // 这里可以添加搜索数据的逻辑
            });
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const searchText = this.value.trim();
                    console.log('搜索内容:', searchText);
                    // 这里可以添加搜索数据的逻辑
                }
            });
        }
    }
    
    // 数据表格复选框功能
    function setupTableCheckboxes() {
        const selectAllCheckbox = document.querySelector('.select-all-checkbox');
        const dataCheckboxes = document.querySelectorAll('.data-checkbox');
        
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', function() {
                const isChecked = this.checked;
                dataCheckboxes.forEach(checkbox => {
                    checkbox.checked = isChecked;
                });
            });
        }
        
        dataCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const allChecked = Array.from(dataCheckboxes).every(checkbox => checkbox.checked);
                if (selectAllCheckbox) {
                    selectAllCheckbox.checked = allChecked;
                }
            });
        });
    }
    
    // 操作按钮功能
    function setupActionButtons() {
        const addBtn = document.querySelector('.btn-primary');
        const importBtn = document.querySelectorAll('.btn-secondary')[0];
        const downloadBtn = document.querySelectorAll('.btn-secondary')[1];
        
        if (addBtn) {
            addBtn.addEventListener('click', function() {
                console.log('新增数据');
                // 这里可以添加新增数据的逻辑
            });
        }
        
        if (importBtn) {
            importBtn.addEventListener('click', function() {
                console.log('导入数据');
                // 这里可以添加导入数据的逻辑
            });
        }
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function() {
                console.log('下载模板');
                // 这里可以添加下载模板的逻辑
            });
        }
    }
    
    // 编辑和删除功能
    function setupEditDeleteActions() {
        const editBtns = document.querySelectorAll('.edit-btn');
        const deleteBtns = document.querySelectorAll('.delete-btn');
        
        editBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const rowIndex = row.rowIndex - 1; // 减去表头行
                console.log('编辑第', rowIndex, '行数据');
                // 这里可以添加编辑数据的逻辑
            });
        });
        
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const rowIndex = row.rowIndex - 1; // 减去表头行
                console.log('删除第', rowIndex, '行数据');
                // 这里可以添加删除数据的逻辑
                if (confirm('确定要删除这行数据吗？')) {
                    row.remove();
                }
            });
        });
    }
    
    // 价值量数据详情页面筛选功能实现
    function setupValueDataDetail() {
        // 市和区县联动功能
        const cityTags = document.querySelectorAll('.city-tag');
        const districtTags = document.querySelectorAll('.district-tag');
        
        // 保存区县标签的原始状态
        const originalDistrictTags = Array.from(districtTags).map(tag => tag.outerHTML);
        
        // 市标签点击事件
        cityTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // 移除所有市标签的active状态
                cityTags.forEach(cityTag => cityTag.classList.remove('active'));
                // 添加当前市标签的active状态
                this.classList.add('active');
                
                const selectedCity = this.getAttribute('data-city');
                console.log('选择城市:', selectedCity);
                
                // 更新区县标签
                if (selectedCity === 'all') {
                    // 显示所有区县
                    districtTags.forEach(districtTag => {
                        districtTag.style.display = 'inline-block';
                    });
                } else {
                    // 只显示选中城市的区县
                    districtTags.forEach(districtTag => {
                        if (districtTag.classList.contains(selectedCity) || districtTag.getAttribute('data-district') === 'all') {
                            districtTag.style.display = 'inline-block';
                        } else {
                            districtTag.style.display = 'none';
                        }
                    });
                }
                
                // 重置区县标签的active状态，只保留'全部'标签的active状态
                districtTags.forEach(districtTag => {
                    if (districtTag.getAttribute('data-district') === 'all') {
                        districtTag.classList.add('active');
                    } else {
                        districtTag.classList.remove('active');
                    }
                });
            });
        });
        
        // 区县标签点击事件
        districtTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // 移除所有区县标签的active状态
                districtTags.forEach(districtTag => districtTag.classList.remove('active'));
                // 添加当前区县标签的active状态
                this.classList.add('active');
                
                const selectedDistrict = this.getAttribute('data-district');
                console.log('选择区县:', selectedDistrict);
                // 这里可以添加筛选数据的逻辑
            });
        });
        
        // 年份标签点击事件
        const yearTags = document.querySelectorAll('.time-tag');
        yearTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // 移除所有年份标签的active状态
                yearTags.forEach(yearTag => yearTag.classList.remove('active'));
                // 添加当前年份标签的active状态
                this.classList.add('active');
                
                const selectedYear = this.getAttribute('data-year');
                console.log('选择年份:', selectedYear);
                // 这里可以添加筛选数据的逻辑
            });
        });
        
        // 全选按钮功能
        const selectAllBtn = document.querySelector('.select-all-btn');
        if (selectAllBtn) {
            selectAllBtn.addEventListener('click', function() {
                const dataCheckboxes = document.querySelectorAll('.data-checkbox');
                const selectAllCheckbox = document.querySelector('.select-all-checkbox');
                
                // 检查是否有未选中的复选框
                const hasUnchecked = Array.from(dataCheckboxes).some(checkbox => !checkbox.checked);
                
                // 全选或取消全选
                dataCheckboxes.forEach(checkbox => {
                    checkbox.checked = hasUnchecked;
                });
                
                // 更新表头的全选复选框状态
                if (selectAllCheckbox) {
                    selectAllCheckbox.checked = hasUnchecked;
                }
            });
        }
        
        // 删除按钮功能
        const deleteBtn = document.querySelector('.stats-btn.delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                const checkedCheckboxes = document.querySelectorAll('.data-checkbox:checked');
                
                if (checkedCheckboxes.length === 0) {
                    alert('请先选择要删除的数据');
                    return;
                }
                
                if (confirm(`确定要删除选中的${checkedCheckboxes.length}条数据吗？`)) {
                    // 遍历所有选中的复选框，删除对应的行
                    checkedCheckboxes.forEach(checkbox => {
                        const row = checkbox.closest('tr');
                        if (row) {
                            row.remove();
                        }
                    });
                }
            });
        }
    }
    
    // 初始化价值量数据详情页面功能
    setupCategoryTabs();
    setupValueTabs();
    setupSearch();
    setupTableCheckboxes();
    setupActionButtons();
    setupEditDeleteActions();
    setupValueDataDetail();
});


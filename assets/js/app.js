var ProjectModel = Backbone.Model.extend({}),
    ProjectCollection = Backbone.Collection.extend({
        model: ProjectModel,
        url: "data/projects.json"
    }),
    ProjectItemView = Backbone.View.extend({
        template: _.template($("#tmplt-project").html()),

        initialize: function () {
            this.render();
        },

        render: function () {
            var model = this.model.toJSON();
            this.el = this.template({project: model});
            return this;
        }
    }),
    ProjectView = Backbone.View.extend({
        el: $('#projects-container'),

        initialize: function () {
            this.listenTo(this.collection, "reset", this.render);
        },

        render: function () {
            this.addAll(this.collection);
        },
        
        addAll: function (projects) {
            projects.each(function (project) {
                pView = new ProjectItemView({model: project});
                this.$el.append(pView.render().el);
            }, this);
        }
    });

var projects = new ProjectCollection();
new ProjectView({collection: projects});
projects.fetch({reset:true});